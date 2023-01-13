import { ProductPage } from '@infra/pages/productPage'
import { closeBrowser } from '@tests/mocks/browser/puppeteerClient'
import { mockProductPage } from '@tests/mocks/pages/mockProductPage'
import { Page } from 'puppeteer'

let productPageMock: Page

beforeEach(async () => {
  productPageMock = await mockProductPage()
})

afterAll(async () => {
  await closeBrowser()
})

describe('Product Page', () => {
  test('Should get the product data correctly', async () => {
    const productPage = new ProductPage(productPageMock)
    const productData = await productPage.getProductData()
    expect(productData).toEqual({
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
