import { Page } from 'puppeteer'
import { PuppeteerElement } from '@/infra/browser/puppeteer'
import { IElement, IPage } from '@/domain/protocols/browser'

export class PuppeteerPage implements IPage {
  private readonly page: Page

  constructor (page: Page) {
    this.page = page
  }

  async getElementByXPath (xpath: string): Promise<IElement> {
    const element = await this.page.$$('xpath/' + xpath)
    return new PuppeteerElement(element[0])
  }

  async getElementsByXPath (xpath: string): Promise<IElement[]> {
    const elements = await this.page.$$('xpath/' + xpath)
    return elements.map((element) => new PuppeteerElement(element))
  }

  async goto (url: string): Promise<void> {
    await this.page.goto(url)
  }

  async close (): Promise<void> {
    await this.page.close()
  }
}
