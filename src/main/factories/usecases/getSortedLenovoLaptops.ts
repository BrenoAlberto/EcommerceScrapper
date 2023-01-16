import { GetSortedLenovoLaptops } from '@/domain/usecases/getSortedLenovoLaptops'
import {
  makeGetLaptopsData,
  makeGetLaptopsURIs,
  makeSortLaptopsByPrice
} from '@/main/factories/usecases'

export const makeGetSortedLenovoLaptops = async (driver: 'puppeteer' | 'playwright'): Promise<GetSortedLenovoLaptops> => {
  const getLaptopsURIsUsecase = await makeGetLaptopsURIs(driver)
  const getLaptopsDataUsecase = await makeGetLaptopsData(driver)
  const sortLaptopsByPriceUsecase = await makeSortLaptopsByPrice()
  return new GetSortedLenovoLaptops(
    getLaptopsURIsUsecase,
    getLaptopsDataUsecase,
    sortLaptopsByPriceUsecase
  )
}
