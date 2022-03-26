import { UseCase } from "@core/domain/UseCase";
import { InvalidEntityError } from "@core/shared/errors/InvalidEntityError";
import { Either, left, right } from "@core/shared/logic/Either";
import { CreateItemProps } from "@modules/stock/domain/Item";
import { StockRepository } from "@modules/stock/repositories/StockRepository";
import { StockNotFound } from "@modules/stock/useCases/errors/StockNotFound";

export class IncludeItemsInStockUseCase implements UseCase<RequestIncludeItemsInStock, ResponseIncludeItemsInStock> {
  constructor(private stockRepository: StockRepository){}

  async execute({ stockId, items }: RequestIncludeItemsInStock): Promise<ResponseIncludeItemsInStock> {
    const stock = await this.stockRepository.findById(stockId)
    if(!stock) return left(new StockNotFound())

    items.forEach(stock.includeItem.bind(stock));

    if(!stock.isValid()) return left(new InvalidEntityError('Stock'))

    await this.stockRepository.save(stock)

    return right({
      message: 'Items saved successfully'
    })
  }
}

type RequestIncludeItemsInStock = {
  stockId: string
  items:CreateItemProps[]
}

type ResponseOk = {
  message: string
}

type ResponseIncludeItemsInStock = Either<StockNotFound | InvalidEntityError, ResponseOk>