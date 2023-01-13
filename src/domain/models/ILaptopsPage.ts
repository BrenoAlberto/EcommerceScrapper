export interface ILaptopsPage {
  getLaptopURIs: (pageURL: string, filter: string) => Promise<string[]>
}
