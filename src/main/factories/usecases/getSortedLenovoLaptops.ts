import { GetSortedLenovoLaptops } from '@/domain/usecases/getSortedLenovoLaptops'
import { makeLaptopsPagePuppeteer } from '../pages/laptopsPagePuppeteer'
import { makeProductPagePuppeteer } from '../pages/productPagePuppeteer'

export const makeGetSortedLenovoLaptops = async (): Promise<GetSortedLenovoLaptops> => {
  const laptopsPage = await makeLaptopsPagePuppeteer()
  const productPage = await makeProductPagePuppeteer()
  return new GetSortedLenovoLaptops(
    laptopsPage,
    productPage
  )
}
