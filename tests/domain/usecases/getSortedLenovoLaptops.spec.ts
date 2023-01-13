import { makeGetSortedLenovoLaptops } from '@main/factories/usecases/getSortedLenovoLaptops'
import { closeBrowser } from '@tests/mocks/browser/puppeteerClient'

afterAll(async () => {
  await closeBrowser()
})

describe('Product Page', () => {
  test('Should get the laptop URIs list correctly', async () => {
    const getSortedLenovoLaptops = await makeGetSortedLenovoLaptops()
    const sortedLenovoLaptops = await getSortedLenovoLaptops.execute()
    expect(sortedLenovoLaptops.length).toBeGreaterThan(0)
  })
})
