import { Browser, chromium } from 'playwright'
import { IBrowser, IPage } from '@/domain/protocols/browser'
import { PlaywrightPage } from '@/infra/browser/playwright'

class PlaywrightBrowser implements IBrowser {
  private browser: Browser

  async launch (): Promise<void> {
    if (!this.browser) {
      console.log('Launching playwright...')
      this.browser = await chromium.launch(
        {
          headless: true,
          args: ['--no-sandbox', '--disable-setuid-sandbox']
        }
      )
    }
  }

  async close (): Promise<void> {
    if (!this.browser) return
    console.log('Closing playwright...')
    await this.browser.close()
  }

  async newPage (): Promise<IPage> {
    const page = await this.browser.newPage()
    return new PlaywrightPage(page)
  }
}

export const playwrightBrowser = new PlaywrightBrowser()
