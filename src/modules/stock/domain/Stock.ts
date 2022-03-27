import { AggregateRoot } from '@core/domain/AggregateRoot'
import { DomainError } from '@core/domain/errors/DomainError'
import { CreateItemProps, Item } from './Item'
import { Product } from './Product'

export class Stock extends AggregateRoot<StockProps> {
  static create ({
    name,
    branch
  }: StockCreate, id?: string): Stock | DomainError {
    return new Stock({
      name,
      branch,
      items: new Map<string, Item>()
    }, id)
  }

  includeItem (item: CreateItemProps) {
    const itemOrError = Item.create(item)
    if (itemOrError instanceof DomainError) return this.includeNewError(itemOrError)
    this._props.items.set(itemOrError.id, itemOrError)
  }

  removeItem (itemId: string) {
    this._props.items.delete(itemId)
  }

  checkThePossibilityOfProducing (quantity: number, product: Product) {
    return product.props.composition.reduce((acc, cur) => {
      const item = this.props.items.get(cur.itemId)
      if (!item) {
        acc = false
        return acc
      }
      return (item?.quantity >= (cur.quantity * quantity)) && acc
    }, true)
  }

  get items () {
    return Array.from(this._props.items.values())
  }
}

interface StockProps {
  name: string;
  branch: string;
  items: Map<string, Item>;
}

interface StockCreate {
  name: string;
  branch: string;
}
