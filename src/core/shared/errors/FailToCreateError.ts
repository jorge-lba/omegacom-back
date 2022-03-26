import { DomainError } from '@core/domain/errors/DomainError'

export class FailToCreateError extends DomainError {
  constructor (context: string) {
    super({
      message: `Fail to Create a ${context}`,
      context,
      name: 'FailToCreateError'
    })
  }
}
