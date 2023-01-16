import { ElementHandle } from 'puppeteer'
import { IElement } from '@/domain/protocols/browser'

export class PuppeteerElement implements IElement {
  constructor (private readonly element: ElementHandle) { }

  async getText (): Promise<string | null> {
    return this.element.evaluate((element) => element.textContent)
  }

  async getHref (): Promise<string | null> {
    // @ts-expect-error
    return this.element.evaluate((element) => element.href)
  }

  async click (): Promise<void> {
    await this.element.click()
  }

  async getElementByXPath (xpath: string): Promise<IElement | null> {
    const element = (await this.element.$x(xpath))[0]
    if (!element) return null
    // @ts-expect-error
    return new PuppeteerElement(element)
  }

  async getElementsByXPath (xpath: string): Promise<IElement[]> {
    const elements = await this.element.$x(xpath)
    const filterElements = elements.filter((element) => element)
    // @ts-expect-error
    return filterElements.map((element) => new PuppeteerElement(element))
  }
}
