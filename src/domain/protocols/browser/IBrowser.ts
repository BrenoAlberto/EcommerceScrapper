import { IPage } from './IPage'

export interface IBrowser {
  launch: () => Promise<void>
  close: () => Promise<void>
  newPage: () => Promise<IPage>
}
