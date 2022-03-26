import { DomainError } from '@core/domain/errors/DomainError'

export class InvalidEntityError extends DomainError {
  constructor (context: string) {
    super({
      message: `${context} is invalid`,
      context,
      name: 'InvalidEntityError'
    })
  }
}
