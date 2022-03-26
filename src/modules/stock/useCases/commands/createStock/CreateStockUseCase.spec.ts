import { ItemRepositoryInMemory } from '@modules/stock/repositories/inMemory/ItemRepositoryInMemory'
import { StockRepositoryInMemory } from '@modules/stock/repositories/inMemory/StockRepositoryInMemory'
import { expect } from 'chai'
import { CreateStockUseCase as UseCase } from './CreateStockUseCase'

export function CreateStockUseCase () {
  let useCase: UseCase

  it('should be create a new stock', async function () {
    const response = await useCase.execute({
      name: 'Office',
      branch: 'São Paulo - SP'
    })

    expect(response.value).to.be.contains({ message: 'Stock saved successfully' })
  })

  it('should not be create a stock duplicated', async function () {
    const request = {
      name: 'Office',
      branch: 'São Paulo - SP'
    }

    await useCase.execute(request)
    const response = await useCase.execute(request)

    expect(response.value).to.be.contains({ message: 'Stock already exists' })
  })

  beforeEach(function () {
    const itemRepository = new ItemRepositoryInMemory()
    const stockRepository = new StockRepositoryInMemory(itemRepository)
    useCase = new UseCase(stockRepository)
  })
}
