import { makeLaptopListPage } from '@/main/factories/pages/laptopListPage'
import { puppeteerBrowser } from '@/infra/browser/puppeteer'

afterAll(async () => {
  await puppeteerBrowser.close()
})

describe('Product Page', () => {
  test('Should get the laptop URIs list correctly', async () => {
    const laptopsPage = await makeLaptopListPage('puppeteer')
    const laptopsURIs = await laptopsPage.getLaptopURIs('https://webscraper.io/test-sites/e-commerce/allinone/computers/laptops', 'Lenovo')
    expect(laptopsURIs.length).toBeGreaterThan(0)
  })
})
