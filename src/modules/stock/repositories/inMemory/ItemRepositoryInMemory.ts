import { Item } from '@modules/stock/domain/Item'
import { ItemRepository } from '../ItemRepository'

export class ItemRepositoryInMemory implements ItemRepository {
  private _items: Map<string, Item> = new Map()

  exists (id: string): Promise<boolean> {
    throw new Error('Method not implemented.')
  }

  async bulkSave (items: Item[]): Promise<Item[]> {
    items.forEach(item => this._items.set(item.id, item))
    return items
  }
}
