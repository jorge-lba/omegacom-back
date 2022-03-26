import { DomainError } from "@core/domain/errors/DomainError";
import { UseCase } from "@core/domain/UseCase";
import { Either, left, right } from "@core/shared/logic/Either";
import { Stock } from "@modules/stock/domain/Stock";
import { StockRepository } from "@modules/stock/repositories/StockRepository";
import { InvalidStockError } from "@modules/stock/useCases/errors/InvalidStockError";
import { StockAlreadyExists } from "@modules/stock/useCases/errors/StockAlreadyExists";

export class CreateStockUseCase implements UseCase<RequestCreateStock, ResponseCreateStock> {
  constructor(private stockRepository: StockRepository){}

  async execute({ name, branch }: RequestCreateStock): Promise<ResponseCreateStock> {
    const stockAlreadyExists = await this.stockRepository.exists({ name, branch })
    if(stockAlreadyExists) return left(new StockAlreadyExists())

    const stockOrError = Stock.create({ name, branch })

    if(stockOrError instanceof DomainError) 
      return left(new InvalidStockError([stockOrError]))

    await this.stockRepository.save(stockOrError)

    return right({
      message: 'Stock saved successfully'
    })
  }
}

type RequestCreateStock = {
  name: string;
  branch: string;
}

type ResponseOk = {
  message: string
}

type ResponseCreateStock = Either<InvalidStockError | StockAlreadyExists, ResponseOk>