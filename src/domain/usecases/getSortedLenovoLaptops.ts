import { Laptop } from '@/domain/models/laptop'
import { SortLaptopsByPrice } from './sortLaptopsByPrice'
import { GetLaptopsData } from './getLaptopsData'
import { GetLaptopsURIs } from './getLaptopURIs'

export class GetSortedLenovoLaptops {
  constructor (
    private readonly getLaptopsURIs: GetLaptopsURIs,
    private readonly getLaptopsData: GetLaptopsData,
    private readonly sortLaptopsByPrice: SortLaptopsByPrice
  ) {}

  async execute (): Promise<Laptop.ModelDetailed[]> {
    const laptopsURIs = await this.getLaptopsURIs.execute('https://webscraper.io/test-sites/e-commerce/allinone/computers/laptops', 'Lenovo')
    const laptopsData = await this.getLaptopsData.execute(laptopsURIs)
    return this.sortLaptopsByPrice.execute(laptopsData)
  }
}
