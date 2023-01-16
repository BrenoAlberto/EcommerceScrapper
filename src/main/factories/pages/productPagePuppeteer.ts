import { IProductPage } from '@/domain/protocols/IProductPage'
import { getBrowser } from '@/infra/browser/puppeteerClient'
import { ProductPagePuppeteer } from '@/infra/pages/productPagePuppeteer'

export const makeProductPagePuppeteer = async (): Promise<IProductPage> => {
  return new ProductPagePuppeteer(await getBrowser())
}
