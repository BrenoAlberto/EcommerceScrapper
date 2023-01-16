import { GetSortedLenovoLaptops } from '@/domain/usecases/getSortedLenovoLaptops'
import { ok, serverError } from '../helpers'
import { HttpResponse, IController } from '../protocols'

export class GetSortedLenovoLaptopsController implements IController {
  constructor (
    private readonly getSortedLenovoLaptops: GetSortedLenovoLaptops
  ) { }

  async handle (): Promise<HttpResponse> {
    try {
      return ok(await this.getSortedLenovoLaptops.execute())
    } catch (error) {
      return serverError(error)
    }
  }
}
