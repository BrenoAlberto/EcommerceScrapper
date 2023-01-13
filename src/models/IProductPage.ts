import { ProductData } from './IProduct'

export interface IProductPage {
  getProductData: () => Promise<ProductData>
}
