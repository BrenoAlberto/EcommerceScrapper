import { ILaptopListPage } from '@/domain/protocols/ILaptopListPage'
import { Laptop } from '@/domain/models/laptop'
import { IProductPage } from '@/domain/protocols/IProductPage'

type DistinctLaptop = {
  title: string
  description: string
  uri: string
  review: {
    score: number
    count: number
  }
  memory: number
  price: number
  available: boolean
}

export class GetSortedLenovoLaptops {
  constructor (
    private readonly laptopsPage: ILaptopListPage,
    private readonly productPage: IProductPage
  ) {}

  async execute (): Promise<Laptop.ModelDetailed[]> {
    const laptopsURIs = await this.laptopsPage.getLaptopURIs('https://webscraper.io/test-sites/e-commerce/allinone/computers/laptops', 'Lenovo')
    const concurrency = 20
    const laptopsData: Laptop.Model[] = []
    for (let i = 0; i < laptopsURIs.length; i += concurrency) {
      const laptopsURIsChunk = laptopsURIs.slice(i, i + concurrency)
      const laptopsDataChunk = await Promise.all(
        laptopsURIsChunk.map(async uri => {
          return this.productPage.getLaptopData(uri)
        })
      )
      laptopsData.push(...laptopsDataChunk)
    }

    const distinctLaptops: DistinctLaptop[] = []
    for (const laptop of laptopsData) {
      for (const variableDetail of laptop.variableDetails) {
        distinctLaptops.push({
          title: laptop.title,
          description: laptop.description,
          uri: laptop.uri,
          review: laptop.review,
          memory: variableDetail.memory,
          price: variableDetail.price,
          available: variableDetail.available
        })
      }
    }

    return distinctLaptops.sort((a, b) => a.price - b.price)
  }
}
