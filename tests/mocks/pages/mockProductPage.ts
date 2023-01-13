import { Page } from 'puppeteer'
// import fs from 'fs'
// import path from 'path'
import { getBrowser } from '../browser/puppeteerClient'

let productPageMock: Page
// const html = fs.readFileSync(path.join(__dirname, '/productPage.html'), 'utf8')

export async function mockProductPage (): Promise<Page> {
  if (!productPageMock) {
    const browser = await getBrowser()
    productPageMock = await browser.newPage()
  }
  //   await productPageMock.setContent(html)
  await productPageMock.goto('https://webscraper.io/test-sites/e-commerce/allinone/product/545')
  return productPageMock
}
