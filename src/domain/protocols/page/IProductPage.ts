import { Laptop } from '@/domain/models/laptop'

export interface IProductPage {
  getLaptopData: (productURI: string) => Promise<Laptop.Model>
}
