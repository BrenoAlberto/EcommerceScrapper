import { IProductPage } from '@/domain/models/IProductPage'
import { getBrowser } from '@/infra/browser/puppeteerClient'
import { ProductPagePuppeteer } from '@/infra/pages/productPagePuppeteer'

export const makeProductPagePuppeteer = async (): Promise<IProductPage> => {
  return new ProductPagePuppeteer(await getBrowser())
}
