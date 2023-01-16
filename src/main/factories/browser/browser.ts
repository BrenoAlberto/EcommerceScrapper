import { IBrowser } from '@/domain/protocols/browser'
import { puppeteerBrowser } from '@/infra/browser/puppeteer'

export const makeBrowser = async (
  driver: 'puppeteer' | 'playwright' = 'puppeteer'
): Promise<IBrowser> => {
  let browser: IBrowser

  if (driver === 'puppeteer') {
    browser = puppeteerBrowser
  } else if (driver === 'playwright') {
    throw new Error('Playwright not implemented yet')
  } else {
    throw new Error('Invalid driver')
  }

  await browser.launch()
  return browser
}
