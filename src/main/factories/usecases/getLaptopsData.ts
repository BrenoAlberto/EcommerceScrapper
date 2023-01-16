import { GetLaptopsData } from '@/domain/usecases/getLaptopsData'
import { makeProductPage } from '@/main/factories/pages'

export const makeGetLaptopsData = async (driver: 'puppeteer' | 'playwright'): Promise<GetLaptopsData> => {
  const productPage = await makeProductPage(driver)
  return new GetLaptopsData(productPage)
}
