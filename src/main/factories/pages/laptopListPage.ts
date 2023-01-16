import { ILaptopListPage } from '@/domain/protocols/page'
import { LaptopListPage } from '@/infra/pages/laptopsPage'
import { makeBrowser } from '@/main/factories/browser'

export const makeLaptopListPage = async (driver: 'puppeteer' | 'playwright'): Promise<ILaptopListPage> => {
  const browser = await makeBrowser(driver)
  return new LaptopListPage(browser)
}
