import { SortLaptopsByPrice } from '@/domain/usecases/sortLaptopsByPrice'

export const makeSortLaptopsByPrice = async (): Promise<SortLaptopsByPrice> => {
  return new SortLaptopsByPrice()
}
