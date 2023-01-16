import { makeLaptopListPage } from '@/main/factories/pages/laptopListPage'
import { playwrightBrowser } from '@/infra/browser/playwright'

afterAll(async () => {
  await playwrightBrowser.close()
})

describe('Product Page Playwright', () => {
  test('Should get the laptop URIs list correctly', async () => {
    const laptopsPage = await makeLaptopListPage('playwright')
    const laptopsURIs = await laptopsPage.getLaptopURIs('https://webscraper.io/test-sites/e-commerce/allinone/computers/laptops', 'Lenovo')
    expect(laptopsURIs.length).toBeGreaterThan(0)
  })
})
