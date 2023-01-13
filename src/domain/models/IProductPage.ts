import { ProductData } from './IProduct'

export interface IProductPage {
  getProductData: (productURI: string) => Promise<ProductData>
}
