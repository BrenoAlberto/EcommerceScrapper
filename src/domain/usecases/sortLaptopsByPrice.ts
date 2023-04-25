import { Laptop } from '@/domain/models/laptop'

export class SortLaptopsByPrice {
  execute (laptopsData: Laptop.Model[]): Laptop.ModelDetailed[] {
    const distinctLaptops: Laptop.ModelDetailed[] = []
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
