import { IElement } from './IElement'

export interface IPage {
  getElementByXPath: (xpath: string) => Promise<IElement | null>
  getElementsByXPath: (xpath: string) => Promise<IElement[]>
  goto: (url: string) => Promise<void>
  close: () => Promise<void>
}
