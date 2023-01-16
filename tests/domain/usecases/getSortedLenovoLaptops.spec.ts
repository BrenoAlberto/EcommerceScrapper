import { puppeteerBrowser } from '@/infra/browser/puppeteer'
import { makeGetSortedLenovoLaptops } from '@/main/factories/usecases/getSortedLenovoLaptops'

afterAll(async () => {
  await puppeteerBrowser.close()
})

describe('Product Page', () => {
  test('Should get the laptop URIs list correctly', async () => {
    const getSortedLenovoLaptops = await makeGetSortedLenovoLaptops('puppeteer')
    const sortedLenovoLaptops = await getSortedLenovoLaptops.execute()
    expect(sortedLenovoLaptops.length).toBeGreaterThan(0)
  })
})
