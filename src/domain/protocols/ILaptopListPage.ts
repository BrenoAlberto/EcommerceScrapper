export interface ILaptopListPage {
  getLaptopURIs: (pageURL: string, filter: string) => Promise<string[]>
}
