import { Item } from '../domain/Item'

export interface ItemRepository {
  exists(id: string): Promise<boolean>;
  bulkSave(items: Item[]): Promise<Item[]>;
}
