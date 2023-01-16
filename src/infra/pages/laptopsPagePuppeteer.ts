import { ILaptopListPage } from '@/domain/protocols/ILaptopListPage'
import { Browser } from 'puppeteer'

export class LaptopListPagePuppeteer implements ILaptopListPage {
  private readonly elementsXPathSelectors = {
    productsContainers: '//div[contains(@class, "thumbnail")]',
    productTitle: '//div[@class="caption"]//a[@class="title"]'
  }

  constructor (private readonly browser: Browser) { }

  public async getLaptopURIs (pageURL: string, titleFilter: string): Promise<string[]> {
    const page = await this.browser.newPage()
    await page.goto(pageURL)

    const productsContainers = await page.$x(this.elementsXPathSelectors.productsContainers)
    const laptopsURIs: string[] = []

    for (const productContainer of productsContainers) {
      const title = await productContainer.$x(this.elementsXPathSelectors.productTitle)
      const titleText = await page.evaluate(element => element.textContent, title[0])
      if (titleFilter && !titleText?.includes(titleFilter)) {
        continue
      }
      // @ts-expect-error
      const uri = await page.evaluate(element => element.href, title[0])
      laptopsURIs.push(uri)
    }

    await page.close()
    return laptopsURIs
  }
}
