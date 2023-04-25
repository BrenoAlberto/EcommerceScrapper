import { IBrowser } from '@/domain/protocols/browser';
import { ILaptopListPage } from '@/domain/protocols/page';

export class LaptopListPage implements ILaptopListPage {
  private readonly elementsXPathSelectors = {
    productsContainers: '//div[contains(@class, "thumbnail")]',
    productTitle: '//div[@class="caption"]//a[@class="title"]',
  };

  constructor(private readonly browser: IBrowser) {}

  public async getLaptopURIs(pageURL: string, titleFilter: string): Promise<string[]> {
    const page = await this.browser.newPage();
    await page.goto(pageURL);

    const productsContainers = await page.getElementsByXPath(this.elementsXPathSelectors.productsContainers);

    const laptopURIsPromises = productsContainers.map((productContainer) =>
      this.extractLaptopURI(productContainer, titleFilter)
    );

    const laptopsURIs = await Promise.all(laptopURIsPromises);
    const filteredLaptopURIs = laptopsURIs.filter((uri) => uri !== null) as string[];

    await page.close();
    return filteredLaptopURIs;
  }

  private async extractLaptopURI(productContainer: any, titleFilter: string): Promise<string | null> {
    const title = await productContainer.getElementByXPath(this.elementsXPathSelectors.productTitle);
    if (!title) return null;

    const titleText = await title.getText();
    if (!titleText || (titleFilter && !titleText.includes(titleFilter))) return null;

    const uri = await title.getHref();
    if (!uri) return null;

    return uri;
  }
}
