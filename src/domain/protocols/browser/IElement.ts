export interface IElement {
  getText: () => Promise<string | null>
  getHref: () => Promise<string | null>
  click: () => Promise<void>
  getElementByXPath: (xpath: string) => Promise<IElement | null>
  getElementsByXPath: (xpath: string) => Promise<IElement[]>
}
