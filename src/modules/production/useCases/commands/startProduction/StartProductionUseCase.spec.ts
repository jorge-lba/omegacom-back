import { DomainEvents } from '@core/domain/events/DomainEvents'
import { ProductionRepositoryInMemory } from '@modules/production/repositories/inMemory/ProductionRepositoryInMemory'
import { ProductionRepository } from '@modules/production/repositories/ProductionRepository'
import { inMemory } from '@test/domain/RepositoryInMemory'
import { expect } from 'chai'
import { StartProductionUseCase as UseCase } from './StartProductionUseCase'

export function StartProductionUseCase () {
  let useCase: UseCase
  let productionRepository: ProductionRepository

  it('should be star production', async function () {
    const currentDate = new Date()
    const deliveryDate = new Date(
      currentDate.setHours(currentDate.getHours() + 10)
    )

    const response = await useCase.execute({
      items: [{
        productId: 'ID-01',
        quantity: 10
      }, {
        productId: 'ID-02',
        quantity: 50
      }],
      deliveryDate
    })

    const markedAggregates = Object
      .getOwnPropertyDescriptors(DomainEvents)
      .markedAggregates

    const [productionId] = inMemory.entitiesIds(productionRepository)
    const production = await productionRepository.findById(productionId)

    expect(response.isRight()).to.be.equal(true)
    expect(response.value.message).to.be.equal('Production started successfully')
    expect(markedAggregates.value).to.length(1)
    expect(markedAggregates.value[0].listProducts()).to.length(2)
    expect(production.startAt instanceof Date).to.be.equal(true)
  })

  it('should be fail if not send items in request', async function () {
    const response = await useCase.execute()

    expect(response.isLeft()).to.be.equal(true)
    expect(response.value.message).to.be.equal('Does not contain items for production')
  })

  it('should be fail if the delivery date is less than the current date', async function () {
    const response = await useCase.execute({
      items: [{
        productId: 'ID-01',
        quantity: 10
      }, {
        productId: 'ID-02',
        quantity: 50
      }],
      deliveryDate: new Date(2021)
    })

    expect(response.isLeft()).to.be.equal(true)
    expect(response.value.message).to.be.equal('The delivery date cannot be earlier than the current date')
  })

  beforeEach(function () {
    productionRepository = new ProductionRepositoryInMemory()
    useCase = new UseCase(productionRepository)
  })

  afterEach(function () {
    DomainEvents.clearMarkedAggregates()
  })
}
