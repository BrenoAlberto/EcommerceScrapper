import { GetLaptopsURIs } from '@/domain/usecases/getLaptopURIs'
import { makeLaptopListPage } from '@/main/factories/pages'

export const makeGetLaptopsURIs = async (driver: 'puppeteer' | 'playwright'): Promise<GetLaptopsURIs> => {
  const laptopListPage = await makeLaptopListPage(driver)
  return new GetLaptopsURIs(laptopListPage)
}
