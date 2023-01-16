import { ILaptopListPage } from '../protocols/page'

export class GetLaptopsURIs {
  constructor (
    private readonly laptopsPage: ILaptopListPage
  ) { }

  async execute (laptopsURL: string, filter: string): Promise<string[]> {
    return await this.laptopsPage.getLaptopURIs(laptopsURL, filter)
  }
}
