import { IProductPage } from '@/domain/protocols/page'
import { makeBrowser } from '@/main/factories/browser'
import { ProductPage } from '@/infra/pages/productPage'

export const makeProductPage = async (driver: 'puppeteer' | 'playwright'): Promise<IProductPage> => {
  const browser = await makeBrowser(driver)
  return new ProductPage(browser)
}
