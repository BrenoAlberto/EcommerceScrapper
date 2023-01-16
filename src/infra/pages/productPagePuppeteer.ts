import { Browser, Page } from 'puppeteer'
import { IProductPage } from '@/domain/protocols/IProductPage'
import { Laptop } from '@/domain/models/laptop'

export class ProductPagePuppeteer implements IProductPage {
  private readonly elementsXPathSelectors = {
    title: '//div[@class="caption"]/h4[2]',
    price: '//div[@class="caption"]/h4[1]',
    description: '//div[@class="caption"]/p[@class="description"]',
    memoryOptions: '//label[text()="HDD:"]/following-sibling::div[@class="swatches"]/button[contains(@class, "btn swatch")]',
    memoryAvailableOptions: '//label[text()="HDD:"]/following-sibling::div[@class="swatches"]/button[contains(@class, "btn swatch") and not(contains(@class, "disabled"))]',
    memoryUnavailableOptions: '//label[text()="HDD:"]/following-sibling::div[@class="swatches"]/button[contains(@class, "btn swatch") and (contains(@class, "disabled"))]',
    reviewScore: '//div[@class="ratings"]//p/text()',
    reviewStars: '//div[@class="ratings"]//span[contains(@class, "glyphicon-star")]'
  }

  constructor (private readonly browser: Browser) { }

  public async getLaptopData (productURI: string): Promise<Laptop.Model> {
    const page = await this.browser.newPage()
    await page.goto(productURI)

    const [
      title,
      description,
      reviewCount,
      reviewScore
    ] = await Promise.all([
      this.getTitle(page),
      this.getDescription(page),
      this.getReviewCount(page),
      this.getReviewScore(page)
    ])
    const variableDetails = await this.getVariableDetails(page)
    const response = {
      uri: productURI,
      title,
      description,
      review: {
        score: reviewScore,
        count: reviewCount
      },
      variableDetails
    }

    await page.close()
    return response
  }

  private async getVariableDetails (page: Page): Promise<Laptop.VariableDetail[]> {
    const [
      availableOptions,
      unavailableOptions
    ] = await Promise.all([
      this.getMemoryAvailableOptions(page),
      this.getMemoryUnavailableOptions(page)
    ])

    const variableDetails: Laptop.VariableDetail[] = []

    for (const memory of availableOptions) {
      const price = await this.getVariableMemoryPrice(page, memory)
      variableDetails.push({
        memory,
        price,
        available: true
      })
    }

    for (const memory of unavailableOptions) {
      const price = await this.getVariableMemoryPrice(page, memory)
      variableDetails.push({
        memory,
        price,
        available: false
      })
    }

    return variableDetails
  }

  private async getVariableMemoryPrice (page: Page, memory: number): Promise<number> {
    await this.setMemoryOption(page, memory)
    return await this.getPrice(page)
  }

  private async getTitle (page: Page): Promise<string> {
    const titleElement = await page.$x(this.elementsXPathSelectors.title)
    const titleText = await titleElement[0].evaluate(element => element.textContent)
    if (!titleText) throw new Error('Error getting title')
    return titleText
  }

  private async getPrice (page: Page): Promise<number> {
    const priceElement = await page.$x(this.elementsXPathSelectors.price)
    const priceText = await priceElement[0].evaluate(element => element.textContent)
    if (!priceText) throw new Error('Error getting price')
    return parseFloat(priceText.replace('$', '').replace(',', '.'))
  }

  private async getDescription (page: Page): Promise<string> {
    const descriptionElement = await page.$x(this.elementsXPathSelectors.description)
    const descriptionDirty = await descriptionElement[0].evaluate(element => element.textContent)
    if (!descriptionDirty) throw new Error('Error getting description')
    return descriptionDirty.replace(/\s+/g, ' ').trim()
  }

  private async setMemoryOption (page: Page, memoryOption: number): Promise<void> {
    const memoryOptions = await page.$x(this.elementsXPathSelectors.memoryOptions)
    for (const element of memoryOptions) {
      const memoryOptionText = await element.evaluate(element => element.textContent)
      if (memoryOptionText?.includes(memoryOption.toString())) {
        // @ts-expect-error
        await element.click()
        break
      }
    }
  }

  private async getMemoryAvailableOptions (page: Page): Promise<number[]> {
    const memoryAvailableOptionsElements = await page.$x(this.elementsXPathSelectors.memoryAvailableOptions)
    const memoryAvailableOptions: number[] = []
    for (const element of memoryAvailableOptionsElements) {
      const memoryOption = await element.evaluate(element => element.textContent)
      if (!memoryOption) throw new Error('Error getting available memory option')
      memoryAvailableOptions.push(parseInt(memoryOption))
    }
    return memoryAvailableOptions
  }

  private async getMemoryUnavailableOptions (page: Page): Promise<number[]> {
    const memoryUnavailableOptionsElements = await page.$x(this.elementsXPathSelectors.memoryUnavailableOptions)
    const memoryUnavailableOptions: number[] = []
    for (const element of memoryUnavailableOptionsElements) {
      const memoryOption = await element.evaluate(element => element.textContent)
      if (!memoryOption) throw new Error('Error getting unavailable memory option')
      memoryUnavailableOptions.push(parseInt(memoryOption))
    }
    return memoryUnavailableOptions
  }

  private async getReviewCount (page: Page): Promise<number> {
    const reviewScoreElement = await page.$x(this.elementsXPathSelectors.reviewScore)
    const reviewScoreText = await reviewScoreElement[0].evaluate(element => element.textContent)
    if (!reviewScoreText) throw new Error('Error getting review count')
    return parseFloat(reviewScoreText.replace(',', '.'))
  }

  private async getReviewScore (page: Page): Promise<number> {
    const reviewStarsElements = await page.$x(this.elementsXPathSelectors.reviewStars)
    return reviewStarsElements.length
  }
}
