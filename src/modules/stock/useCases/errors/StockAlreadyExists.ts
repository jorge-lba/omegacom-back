import { UseCaseError } from "@core/domain/errors/UseCaseError";

export class StockAlreadyExists extends UseCaseError {
  constructor(){
    super('Stock already exists')
  }
}