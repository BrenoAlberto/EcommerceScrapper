import { ILaptopsPage } from '@/domain/models/ILaptopsPage'
import { getBrowser } from '@/infra/browser/puppeteerClient'
import { LaptopsPagePuppeteer } from '@/infra/pages/laptopsPagePuppeteer'

export const makeLaptopsPagePuppeteer = async (): Promise<ILaptopsPage> => {
  return new LaptopsPagePuppeteer(await getBrowser())
}
