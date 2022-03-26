import { Entity } from '@core/domain/Entity'
import { Stock } from '@modules/stock/domain/Stock'
import { ItemRepository } from '../ItemRepository'
import { ExistsProps, StockRepository } from '../StockRepository'

export class StockRepositoryInMemory implements StockRepository {
  private stocks: Map<string, Stock> = new Map<string, Stock>()

  constructor (private itemRepository: ItemRepository) {}

  async findById (id: string): Promise<Stock> {
    return this.stocks.get(id)
  }

  async exists (props: ExistsProps): Promise<boolean> {
    if (props instanceof Entity) return !!this.stocks.get(props.id)
    return Array.from(this.stocks.values()).some(stock => {
      const { branch, name } = stock.props
      return branch === props.branch && name === props.name
    })
  }

  async save (stock: Stock): Promise<Stock> {
    await this.itemRepository.bulkSave(stock.items)
    this.stocks.set(stock.id, stock)
    return stock
  }
}
