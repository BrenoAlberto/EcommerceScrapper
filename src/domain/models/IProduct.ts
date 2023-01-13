export interface ProductVariableDetail {
  memory: number
  price: number
  available: boolean
}

export interface ProductData {
  uri: string
  title: string
  description: string
  review: {
    score: number
    count: number
  }
  variableDetails: ProductVariableDetail[]
}
