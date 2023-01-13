import puppeteer, { Browser } from 'puppeteer'

let browser: Browser

export const getBrowser = async (): Promise<Browser> => {
  if (!browser) {
    browser = await puppeteer.launch(
      {
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
      }
    )
  }
  return browser
}

export const closeBrowser = async (): Promise<void> => {
  if (browser) {
    await browser.close()
  }
}
