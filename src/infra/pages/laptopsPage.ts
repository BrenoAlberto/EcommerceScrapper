import { IBrowser } from '@/domain/protocols/browser'
import { ILaptopListPage } from '@/domain/protocols/page'

export class LaptopListPage implements ILaptopListPage {
  private readonly elementsXPathSelectors = {
    productsContainers: '//div[contains(@class, "thumbnail")]',
    productTitle: '//div[@class="caption"]//a[@class="title"]'
  }

  constructor (private readonly browser: IBrowser) { }

  public async getLaptopURIs (pageURL: string, titleFilter: string): Promise<string[]> {
    const page = await this.browser.newPage()
    await page.goto(pageURL)

    const productsContainers = await page.getElementsByXPath(this.elementsXPathSelectors.productsContainers)
    const laptopsURIs: string[] = []

    for (const productContainer of productsContainers) {
      const title = await productContainer.getElementByXPath(this.elementsXPathSelectors.productTitle)
      if (!title) continue
      const titleText = await title.getText()
      if (!titleText) continue
      const uri = await title.getHref()
      if (!uri) continue
      if (titleFilter && !titleText.includes(titleFilter)) {
        continue
      }
      laptopsURIs.push(uri)
    }

    await page.close()
    return laptopsURIs
  }
}
