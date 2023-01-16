import { ILaptopListPage } from '@/domain/protocols/ILaptopListPage'
import { getBrowser } from '@/infra/browser/puppeteerClient'
import { LaptopListPagePuppeteer } from '@/infra/pages/laptopsPagePuppeteer'

export const makeLaptopListPagePuppeteer = async (): Promise<ILaptopListPage> => {
  return new LaptopListPagePuppeteer(await getBrowser())
}
