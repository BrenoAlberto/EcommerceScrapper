export namespace Laptop {
  export interface ModelDetailed {
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

  export interface Model {
    uri: string
    title: string
    description: string
    review: {
      score: number
      count: number
    }
    variableDetails: VariableDetail[]
  }

  export interface VariableDetail {
    memory: number
    price: number
    available: boolean
  }
}
