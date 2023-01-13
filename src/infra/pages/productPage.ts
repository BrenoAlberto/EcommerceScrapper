import { Page } from 'puppeteer'
import { IProductPage, ProductData } from './IProductPage'

export class ProductPage implements IProductPage {
  elementsXPathSelectors = {
    title: '//div[@class="caption"]/h4[2]',
    price: '//div[@class="caption"]/h4[1]',
    description: '//div[@class="caption"]/p[@class="description"]',
    memoryOptions: '//label[text()="HDD:"]/following-sibling::div[@class="swatches"]/button[contains(@class, "btn swatch")]',
    memoryAvailableOptions: '//label[text()="HDD:"]/following-sibling::div[@class="swatches"]/button[contains(@class, "btn swatch") and not(contains(@class, "disabled"))]',
    memoryUnavailableOptions: '//label[text()="HDD:"]/following-sibling::div[@class="swatches"]/button[contains(@class, "btn swatch") and (contains(@class, "disabled"))]',
    reviewScore: '//div[@class="ratings"]//p/text()',
    reviewStars: '//div[@class="ratings"]//span[contains(@class, "glyphicon-star")]'
  }

  constructor (private readonly page: Page) { }

  public async getProductData (): Promise<ProductData> {
    const [
      title,
      description,
      reviewCount,
      reviewScore
    ] = await Promise.all([
      this.getTitle(),
      this.getDescription(),
      this.getReviewCount(),
      this.getReviewScore()
    ])
    const variableDetails = await this.getVariableDetails()
    return {
      title,
      description,
      review: {
        score: reviewScore,
        count: reviewCount
      },
      variableDetails
    }
  }

  private async getVariableDetails (): Promise<Array<{
    memory: number
    price: number
    available: boolean
  }>> {
    const [
      availableOptions,
      unavailableOptions
    ] = await Promise.all([
      this.getMemoryAvailableOptions(),
      this.getMemoryUnavailableOptions()
    ])

    const variableDetails: Array<{
      memory: number
      price: number
      available: boolean
    }> = []

    for (const memory of availableOptions) {
      const price = await this.getVariableMemoryPrice(memory)
      variableDetails.push({
        memory,
        price,
        available: true
      })
    }

    for (const memory of unavailableOptions) {
      const price = await this.getVariableMemoryPrice(memory)
      variableDetails.push({
        memory,
        price,
        available: false
      })
    }

    return variableDetails
  }

  private async getVariableMemoryPrice (memory: number): Promise<number> {
    await this.setMemoryOption(memory)
    return await this.getPrice()
  }

  private async getTitle (): Promise<string> {
    const titleElement = await this.page.$x(this.elementsXPathSelectors.title)
    return titleElement[0].evaluate(element => element.textContent)
  }

  private async getPrice (): Promise<number> {
    const priceElement = await this.page.$x(this.elementsXPathSelectors.price)
    const priceText = await priceElement[0].evaluate(element => element.textContent)
    return parseFloat(priceText.replace('$', '').replace(',', '.'))
  }

  private async getDescription (): Promise<string> {
    const descriptionElement = await this.page.$x(this.elementsXPathSelectors.description)
    const descriptionDirty = await descriptionElement[0].evaluate(element => element.textContent)
    return descriptionDirty.replace(/\s+/g, ' ').trim()
  }

  private async setMemoryOption (memoryOption: number): Promise<void> {
    const memoryOptions = await this.page.$x(this.elementsXPathSelectors.memoryOptions)
    for (const element of memoryOptions) {
      const memoryOptionText = await element.evaluate(element => element.textContent)
      if (memoryOptionText.includes(memoryOption.toString())) {
        await element.click()
        break
      }
    }
  }

  private async getMemoryAvailableOptions (): Promise<number[]> {
    const memoryAvailableOptionsElements = await this.page.$x(this.elementsXPathSelectors.memoryAvailableOptions)
    const memoryAvailableOptions: number[] = []
    for (const element of memoryAvailableOptionsElements) {
      const memoryOption = await element.evaluate(element => element.textContent)
      memoryAvailableOptions.push(parseInt(memoryOption))
    }
    return memoryAvailableOptions
  }

  private async getMemoryUnavailableOptions (): Promise<number[]> {
    const memoryUnavailableOptionsElements = await this.page.$x(this.elementsXPathSelectors.memoryUnavailableOptions)
    const memoryUnavailableOptions: number[] = []
    for (const element of memoryUnavailableOptionsElements) {
      const memoryOption = await element.evaluate(element => element.textContent)
      memoryUnavailableOptions.push(parseInt(memoryOption))
    }
    return memoryUnavailableOptions
  }

  private async getReviewCount (): Promise<number> {
    const reviewScoreElement = await this.page.$x(this.elementsXPathSelectors.reviewScore)
    const reviewScoreText = await reviewScoreElement[0].evaluate(element => element.textContent)
    return parseFloat(reviewScoreText.replace(',', '.'))
  }

  private async getReviewScore (): Promise<number> {
    const reviewStarsElements = await this.page.$x(this.elementsXPathSelectors.reviewStars)
    return reviewStarsElements.length
  }
}
