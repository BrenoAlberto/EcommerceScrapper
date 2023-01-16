import { getBrowser } from '@/infra/browser/puppeteerClient'
import { LaptopListPagePuppeteer } from '@/infra/pages/laptopsPagePuppeteer'
import { closeBrowser } from '@/tests/mocks/browser/puppeteerClient'

afterAll(async () => {
  await closeBrowser()
})

describe('Product Page', () => {
  test('Should get the laptop URIs list correctly', async () => {
    const laptopsPage = new LaptopListPagePuppeteer(await getBrowser())
    const laptopsURIs = await laptopsPage.getLaptopURIs('https://webscraper.io/test-sites/e-commerce/allinone/computers/laptops', 'Lenovo')
    expect(laptopsURIs.length).toBeGreaterThan(0)
  })
})
