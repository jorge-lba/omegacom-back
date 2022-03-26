import { Stock } from '../domain/Stock'

export interface StockRepository {
  exists(props: ExistsProps): Promise<boolean>;
  findById(id: string): Promise<Stock>;
  save(stock: Stock): Promise<Stock>;
}

export type ExistsProps = Stock | { name: string, branch: string }
