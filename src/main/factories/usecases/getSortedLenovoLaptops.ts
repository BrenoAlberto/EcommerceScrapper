import { GetSortedLenovoLaptops } from '@/domain/usecases/getSortedLenovoLaptops'
import { makeLaptopListPagePuppeteer } from '../pages/laptopsPagePuppeteer'
import { makeProductPagePuppeteer } from '../pages/productPagePuppeteer'

export const makeGetSortedLenovoLaptops = async (): Promise<GetSortedLenovoLaptops> => {
  const laptopsPage = await makeLaptopListPagePuppeteer()
  const productPage = await makeProductPagePuppeteer()
  return new GetSortedLenovoLaptops(
    laptopsPage,
    productPage
  )
}
