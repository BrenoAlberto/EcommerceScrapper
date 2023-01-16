
import { IElement } from '@/domain/protocols/browser'
import { ElementHandle } from 'playwright'

export class PlaywrightElement implements IElement {
  constructor (private readonly element: ElementHandle) { }

  async getText (): Promise<string | null> {
    return this.element.evaluate(element => element.textContent)
  }

  async getHref (): Promise<string | null> {
    // @ts-expect-error
    return this.element.evaluate(element => element.href)
  }

  async click (): Promise<void> {
    await this.element.click()
  }

  async getElementByXPath (xpath: string): Promise<IElement | null> {
    const element = await this.element.$(xpath)
    if (!element) return null
    return new PlaywrightElement(element)
  }

  async getElementsByXPath (xpath: string): Promise<IElement[]> {
    const elements = await this.element.$$(xpath)
    const filterElements = elements.filter((element) => element)
    return filterElements.map((element) => new PlaywrightElement(element))
  }
}
