import { AggregateRoot } from '@core/domain/AggregateRoot'
import { Either, left, right } from '@core/shared/logic/Either'
import { InvalidDeliveryDateError } from './errors/InvalidDeliveryDateError'
import { StartProductionEvent } from './events/StartProductionEvent'

export class Production extends AggregateRoot<ProductionProps> {
  start () {
    this.addDomainEvent(new StartProductionEvent(this))
  }

  static create (props: CreateProductionProps): Either<Error, Production> {
    const deliveryDate = this.validateDeliveryDate(props.deliveryDate)

    if (deliveryDate.isLeft()) return left(deliveryDate.value)

    return right(new Production({
      items: new Map(),
      deliveryDate: deliveryDate.value
    }))
  }

  private static validateDeliveryDate (date: Date): Either<Error, Date> {
    if (date.getTime() < Date.now()) return left(new InvalidDeliveryDateError())
    return right(date)
  }

  includeProduct (productId: string, quantity: number) {
    const serial = this._props.items.size + 1
    this._props.items.set(serial, {
      serial,
      productId,
      quantity
    })
  }

  listProducts () {
    return Array.from(this._props.items.values())
  }
}

interface ProductionProps {
  serial?: number
  deliveryDate: Date
  items?: Map<number, ProductsToProduction>
}

interface CreateProductionProps {
  deliveryDate: Date
}

interface ProductsToProduction {
  serial: number
  productId: string
  quantity: number
}
