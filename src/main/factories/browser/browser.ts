import { IBrowser } from '@/domain/protocols/browser'
import { playwrightBrowser } from '@/infra/browser/playwright'
import { puppeteerBrowser } from '@/infra/browser/puppeteer'

export const makeBrowser = async (
  driver: 'puppeteer' | 'playwright' = 'puppeteer'
): Promise<IBrowser> => {
  let browser: IBrowser

  if (driver === 'puppeteer') {
    browser = puppeteerBrowser
  } else if (driver === 'playwright') {
    browser = playwrightBrowser
  } else {
    throw new Error('Invalid driver')
  }

  await browser.launch()
  return browser
}
