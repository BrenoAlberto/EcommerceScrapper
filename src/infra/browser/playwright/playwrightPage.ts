import { IElement, IPage } from '@/domain/protocols/browser'
import { Page } from 'playwright'
import { PlaywrightElement } from '@/infra/browser/playwright'

export class PlaywrightPage implements IPage {
  private readonly page: Page

  constructor (page: Page) {
    this.page = page
  }

  async getElementByXPath (xpath: string): Promise<IElement | null> {
    const locator = this.page.locator(xpath)
    const element = (await locator.elementHandles())[0]
    if (!element) return null
    return new PlaywrightElement(element)
  }

  async getElementsByXPath (xpath: string): Promise<IElement[]> {
    const locator = this.page.locator(xpath)
    const elements = await locator.elementHandles()
    return elements.map((element) => new PlaywrightElement(element))
  }

  async goto (url: string): Promise<void> {
    await this.page.goto(url)
  }

  async close (): Promise<void> {
    await this.page.close()
  }
}
