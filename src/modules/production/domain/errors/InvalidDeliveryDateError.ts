import { DomainError } from '@core/domain/errors/DomainError'

export class InvalidDeliveryDateError extends DomainError {
  constructor () {
    super({
      message: 'The delivery date cannot be earlier than the current date',
      context: 'Production',
      name: 'InvalidDeliveryDateError'
    })
  }
}
