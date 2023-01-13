import { ILaptopsPage } from '@domain/models/ILaptopsPage'
import { ProductData } from '@domain/models/IProduct'
import { IProductPage } from '@domain/models/IProductPage'

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
    private readonly laptopsPage: ILaptopsPage,
    private readonly productPage: IProductPage
  ) {}

  async execute (): Promise<DistinctLaptop[]> {
    const laptopsURIs = await this.laptopsPage.getLaptopURIs('https://webscraper.io/test-sites/e-commerce/allinone/computers/laptops', 'Lenovo')
    const concurrency = 40
    const laptopsData: ProductData[] = []
    for (let i = 0; i < laptopsURIs.length; i += concurrency) {
      const laptopsURIsChunk = laptopsURIs.slice(i, i + concurrency)
      const laptopsDataChunk = await Promise.all(
        laptopsURIsChunk.map(async uri => {
          return this.productPage.getProductData(uri)
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
