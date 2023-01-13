export interface ProductData {
  title: string
  description: string
  review: {
    score: number
    count: number
  }
  variableDetails: Array<{
    memory: number
    price: number
  }>
}

export interface IProductPage {
  getProductData: () => Promise<ProductData>
}
