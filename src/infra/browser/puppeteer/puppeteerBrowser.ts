import puppeteer, { Browser } from 'puppeteer'
import { IBrowser, IPage } from '@/domain/protocols/browser'
import { PuppeteerPage } from '@/infra/browser/puppeteer'

class PuppeteerBrowser implements IBrowser {
  private browser: Browser

  async launch (): Promise<void> {
    if (!this.browser) {
      console.log('Launching puppeteer...')
      this.browser = await puppeteer.launch(
        {
          headless: true,
          args: ['--no-sandbox', '--disable-setuid-sandbox']
        }
      )
    }
  }

  async close (): Promise<void> {
    if (!this.browser) return
    console.log('Closing puppeteer...')
    await this.browser.close()
  }

  async newPage (): Promise<IPage> {
    return new PuppeteerPage(await this.browser.newPage())
  }
}

export const puppeteerBrowser = new PuppeteerBrowser()
