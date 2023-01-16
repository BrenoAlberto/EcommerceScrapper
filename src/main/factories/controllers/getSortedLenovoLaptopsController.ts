import { GetSortedLenovoLaptops } from '@/domain/usecases/getSortedLenovoLaptops'
import { GetSortedLenovoLaptopsController } from '@/presentation/controllers/getSortedLenovoLaptopsController'
import { IController } from '@/presentation/protocols'
import { makeGetLaptopsData, makeGetLaptopsURIs, makeSortLaptopsByPrice } from '../usecases'

export const makeGetSortedLenovoLaptopsController = async (driver: 'puppeteer' | 'playwright'): Promise<IController> => {
  const usecase = new GetSortedLenovoLaptops(
    await makeGetLaptopsURIs(driver),
    await makeGetLaptopsData(driver),
    await makeSortLaptopsByPrice()
  )
  return new GetSortedLenovoLaptopsController(usecase)
}
