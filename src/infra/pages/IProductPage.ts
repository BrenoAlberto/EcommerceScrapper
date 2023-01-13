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
    available: boolean
  }>
}

export interface IProductPage {
  getProductData: () => Promise<ProductData>
}
