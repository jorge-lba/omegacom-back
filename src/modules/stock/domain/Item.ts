
import { AggregateRoot } from '@core/domain/AggregateRoot'
import { FailToCreateError } from '@core/shared/errors/FailToCreateError'
import { InsufficientQuantityError } from './errors/InsufficientQuantityError'

class Item extends AggregateRoot<ItemProps> {
  get quantity () {
    return this._props.quantity
  }

  get name () {
    return this._props.name
  }

  static create ({
    name,
    quantity,
    description
  }: CreateItemProps, id?: string): Item | FailToCreateError {
    if (!name.trim()) return new FailToCreateError('Item')

    return new Item({
      name,
      quantity,
      description
    }, id)
  }

  addQuantity (quantity: number) {
    this._props.quantity += quantity
  }

  removeQuantity (quantity: number): void {
    if (this._props.quantity < quantity) {
      const error = new InsufficientQuantityError(this)
      this.includeNewError(error)
      return
    }

    this._props.quantity -= quantity
  }
}

interface ItemProps {
  name: string;
  quantity: number;
  description?: string;
}

interface CreateItemProps {
  name: string;
  quantity: number;
  description?: string;
}

export { Item, ItemProps, CreateItemProps }
