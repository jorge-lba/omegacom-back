import { DomainError } from './DomainError'

export abstract class UseCaseError extends Error {
  private _name: string

  constructor (errors: DomainError[] | string) {
    const message = Array.isArray(errors) ? UseCaseError.makeMessage(errors) : errors
    super(message)
    this._name = this.constructor.name
  }

  get name () {
    return this._name
  }

  private static makeMessage (errors: DomainError[]) {
    const messages = errors.map(error => error.message).join('\n')
    return `${this.name} errors: \n ${messages}`
  }
}
