import { DomainError } from "@core/domain/errors/DomainError"
import { Item } from "../Item"

export class InsufficientQuantityError extends DomainError {
  constructor(item: Item){
    super({
      message: `Insufficient quantity. item: ${item.name} - quantity: ${item.quantity}`,
      context: 'Item',
      name: 'InsufficientQuantityError'
    })
  }
}