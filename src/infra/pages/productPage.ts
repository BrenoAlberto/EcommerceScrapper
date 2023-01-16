import { Laptop } from '@/domain/models/laptop'
import { IBrowser, IPage } from '@/domain/protocols/browser'
import { IProductPage } from '@/domain/protocols/page'

export class ProductPage implements IProductPage {
  private readonly elementsXPathSelectors = {
    title: '//div[@class="caption"]/h4[2]',
    price: '//div[@class="caption"]/h4[1]',
    description: '//div[@class="caption"]/p[@class="description"]',
    memoryOptions: '//label[text()="HDD:"]/following-sibling::div[@class="swatches"]/button[contains(@class, "btn swatch")]',
    memoryAvailableOptions: '//label[text()="HDD:"]/following-sibling::div[@class="swatches"]/button[contains(@class, "btn swatch") and not(contains(@class, "disabled"))]',
    memoryUnavailableOptions: '//label[text()="HDD:"]/following-sibling::div[@class="swatches"]/button[contains(@class, "btn swatch") and (contains(@class, "disabled"))]',
    reviewScore: '//div[@class="ratings"]//p',
    reviewStars: '//div[@class="ratings"]//span[contains(@class, "glyphicon-star")]'
  }

  constructor (private readonly browser: IBrowser) { }

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

  private async getVariableDetails (page: IPage): Promise<Laptop.VariableDetail[]> {
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

  private async getVariableMemoryPrice (page: IPage, memory: number): Promise<number> {
    await this.setMemoryOption(page, memory)
    return await this.getPrice(page)
  }

  private async getTitle (page: IPage): Promise<string> {
    const titleElement = await page.getElementByXPath(this.elementsXPathSelectors.title)
    const title = await titleElement?.getText()
    if (!title) throw new Error('Error getting title')
    return title
  }

  private async getPrice (page: IPage): Promise<number> {
    const priceElement = await page.getElementByXPath(this.elementsXPathSelectors.price)
    const priceText = await priceElement?.getText()
    if (!priceText) throw new Error('Error getting price')
    return parseFloat(priceText.replace('$', '').replace(',', '.'))
  }

  private async getDescription (page: IPage): Promise<string> {
    const descriptionElement = await page.getElementByXPath(this.elementsXPathSelectors.description)
    const descriptionDirty = await descriptionElement?.getText()
    if (!descriptionDirty) throw new Error('Error getting description')
    return descriptionDirty.replace(/\s+/g, ' ').trim()
  }

  private async setMemoryOption (page: IPage, memoryOption: number): Promise<void> {
    const memoryOptions = await page.getElementsByXPath(this.elementsXPathSelectors.memoryOptions)
    for (const element of memoryOptions) {
      const memoryOptionText = await element.getText()
      if (memoryOptionText?.includes(memoryOption.toString())) {
        await element.click()
        break
      }
    }
  }

  private async getMemoryAvailableOptions (page: IPage): Promise<number[]> {
    const memoryAvailableOptionsElements = await page.getElementsByXPath(this.elementsXPathSelectors.memoryAvailableOptions)
    const memoryAvailableOptions: number[] = []
    for (const element of memoryAvailableOptionsElements) {
      const memoryOption = await element.getText()
      if (!memoryOption) throw new Error('Error getting available memory option')
      memoryAvailableOptions.push(parseInt(memoryOption))
    }
    return memoryAvailableOptions
  }

  private async getMemoryUnavailableOptions (page: IPage): Promise<number[]> {
    const memoryUnavailableOptionsElements = await page.getElementsByXPath(this.elementsXPathSelectors.memoryUnavailableOptions)
    const memoryUnavailableOptions: number[] = []
    for (const element of memoryUnavailableOptionsElements) {
      const memoryOption = await element.getText()
      if (!memoryOption) throw new Error('Error getting unavailable memory option')
      memoryUnavailableOptions.push(parseInt(memoryOption))
    }
    return memoryUnavailableOptions
  }

  private async getReviewCount (page: IPage): Promise<number> {
    const reviewScoreElement = await page.getElementByXPath(this.elementsXPathSelectors.reviewScore)
    const reviewScoreText = await reviewScoreElement?.getText()
    if (!reviewScoreText) throw new Error('Error getting review count')
    return parseFloat(reviewScoreText.replace(',', '.'))
  }

  private async getReviewScore (page: IPage): Promise<number> {
    const reviewStarsElements = await page.getElementsByXPath(this.elementsXPathSelectors.reviewStars)
    return reviewStarsElements.length
  }
}
