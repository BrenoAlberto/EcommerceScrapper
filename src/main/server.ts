import 'module-alias/register'
import { playwrightBrowser } from '@/infra/browser/playwright'
import { puppeteerBrowser } from '@/infra/browser/puppeteer'
import { setupApp } from './config/app'

const PORT = 5000

process.on('SIGTERM', shutDown)
process.on('SIGINT', shutDown);

(async () => {
  const app = await setupApp()
  app.listen(PORT, () => { console.log(`Server running at http://localhost:${PORT}`) })
})().catch(console.error)

function shutDown (): void {
  console.log('\nReceived kill signal, shutting down gracefully')

  setTimeout(() => {
    console.error('Could not close connections in time, forcefully shutting down')
    process.exit(1)
  }, 10000)

  puppeteerBrowser.close()
  playwrightBrowser.close()
  process.exit(0)
}
