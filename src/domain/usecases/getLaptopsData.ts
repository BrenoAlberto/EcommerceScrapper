import { Laptop } from '@/domain/models/laptop'
import { IProductPage } from '@/domain/protocols/page'

export class GetLaptopsData {
  constructor (
    private readonly productPage: IProductPage
  ) { }

  async execute (laptopsURIs: string[]): Promise<Laptop.Model[]> {
    const concurrency = 20
    const laptopsData: Laptop.Model[] = []
    for (let i = 0; i < laptopsURIs.length; i += concurrency) {
      console.log(`Getting data from ${i} to ${i + concurrency} of ${laptopsURIs.length} laptops`)
      const laptopsURIsChunk = laptopsURIs.slice(i, i + concurrency)
      const laptopsDataChunk = await Promise.all(
        laptopsURIsChunk.map(async uri => {
          return this.productPage.getLaptopData(uri)
        })
      )
      laptopsData.push(...laptopsDataChunk)
    }
    return laptopsData
  }
}
