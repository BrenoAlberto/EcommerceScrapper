import { makeProductPage } from '@/main/factories/pages/productPage'
import { puppeteerBrowser } from '@/infra/browser/puppeteer'

const productURI = 'https://webscraper.io/test-sites/e-commerce/allinone/product/545'

afterAll(async () => {
  await puppeteerBrowser.close()
})

describe('Product Page', () => {
  test('Should get the product data correctly', async () => {
    const productPage = await makeProductPage('puppeteer')
    const productData = await productPage.getLaptopData(productURI)
    expect(productData).toEqual({
      uri: productURI,
      title: 'Asus VivoBook X441NA-GA190',
      description: 'Asus VivoBook X441NA-GA190 Chocolate Black, 14", Celeron N3450, 4GB, 128GB SSD, Endless OS, ENG kbd',
      review: {
        score: 3,
        count: 14
      },
      variableDetails: [
        {
          memory: 128,
          price: 295.99,
          available: true
        },
        {
          memory: 256,
          price: 315.99,
          available: true
        },
        {
          memory: 512,
          price: 335.99,
          available: true
        },
        {
          memory: 1024,
          price: 355.99,
          available: false
        }
      ]
    })
  })
})
