import { UseCaseError } from '@core/domain/errors/UseCaseError'

export class StockNotFound extends UseCaseError {
  constructor () {
    super('Stock not found')
  }
}
