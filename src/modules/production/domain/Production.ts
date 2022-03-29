import { AggregateRoot } from '@core/domain/AggregateRoot'
import { Product } from '@modules/stock/domain/Product'
import { StartProductionEvent } from './events/StartProductionEvent'

export class Production extends AggregateRoot<ProductionProps> {
  start () {
    this.addDomainEvent(new StartProductionEvent(this))
  }

  static create () {
    return new Production({
      items: new Map()
    })
  }

  includeProduct (product: Product, quantity: number) {
    const serial = this._props.items.size + 1
    this._props.items.set(serial, {
      serial,
      product,
      quantity
    })
  }

  listProducts () {
    return Array.from(this._props.items.values())
  }
}

interface ProductionProps {
  serial?: number
  items?: Map<number, ProductsToProduction>
}

interface ProductsToProduction {
  serial: number
  product: Product
  quantity: number
}
