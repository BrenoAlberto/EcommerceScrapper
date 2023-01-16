import { GetSortedLenovoLaptops } from '@/domain/usecases/getSortedLenovoLaptops'
import { makeLaptopListPage } from '../pages/laptopListPage'
import { makeProductPage } from '../pages/productPage'

export const makeGetSortedLenovoLaptops = async (driver: 'puppeteer' | 'playwright'): Promise<GetSortedLenovoLaptops> => {
  const laptopsPage = await makeLaptopListPage(driver)
  const productPage = await makeProductPage(driver)
  return new GetSortedLenovoLaptops(
    laptopsPage,
    productPage
  )
}
