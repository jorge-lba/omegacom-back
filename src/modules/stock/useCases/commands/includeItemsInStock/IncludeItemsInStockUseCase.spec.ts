import { Stock } from '@modules/stock/domain/Stock'
import { ItemRepositoryInMemory } from '@modules/stock/repositories/inMemory/ItemRepositoryInMemory'
import { StockRepositoryInMemory } from '@modules/stock/repositories/inMemory/StockRepositoryInMemory'
import { StockRepository } from '@modules/stock/repositories/StockRepository'
import { expect } from 'chai'
import faker from 'community-faker'
import { IncludeItemsInStockUseCase as UseCase } from './IncludeItemsInStockUseCase'

export function IncludeItemsInStockUseCase () {
  let useCase: UseCase
  let stock: Stock
  let stockRepository: StockRepository

  it('should be success if include new items in stock', async function () {
    const itemProps = {
      name: faker.commerce.productName(),
      quantity: faker.datatype.number(50)
    }
    const response = await useCase.execute({
      stockId: stock.id,
      items: [itemProps]
    })
    const stockUpdated = await stockRepository.findById(stock.id)

    expect(response.isRight()).to.be.equal(true)
    expect(response.value.message).to.be.equal('Items saved successfully')
    expect(stockUpdated.items).to.be.length(1)
    expect(stockUpdated.items[0].props).to.be.includes(itemProps)
  })

  it('should be fail if stock not exists', async function () {
    const itemProps = {
      name: faker.commerce.productName(),
      quantity: faker.datatype.number(50)
    }
    const response = await useCase.execute({
      stockId: 'invalid id',
      items: [itemProps]
    })

    expect(response.isLeft()).to.be.equal(true)
    expect(response.value.message).to.be.equal('Stock not found')
  })

  it('should be fail if stock not is valid', async function () {
    const itemProps = {
      name: '',
      quantity: faker.datatype.number(50)
    }
    const response = await useCase.execute({
      stockId: stock.id,
      items: [itemProps]
    })

    expect(response.isLeft()).to.be.equal(true)
    expect(response.value.message).to.be.equal('Stock is invalid')
  })

  beforeEach(async function () {
    const itemRepository = new ItemRepositoryInMemory()
    stockRepository = new StockRepositoryInMemory(itemRepository)

    stock = Stock.create({
      name: faker.company.companyName(),
      branch: faker.address.city()
    }) as Stock

    await stockRepository.save(stock)

    useCase = new UseCase(stockRepository)
  })
}
