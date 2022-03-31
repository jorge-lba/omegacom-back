import { DomainEvents } from '@core/domain/events/DomainEvents'
import { expect } from 'chai'
import { StartProductionUseCase as UseCase } from './StartProductionUseCase'

export function StartProductionUseCase () {
  let useCase: UseCase

  it('d', async function () {
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

    expect(response.isRight()).to.be.equal(true)
    expect(response.value.message).to.be.equal('Production started successfully')
    expect(markedAggregates.value).to.length(1)
    expect(markedAggregates.value[0].listProducts()).to.length(2)
  })

  it('2', async function () {
    const response = await useCase.execute()

    expect(response.isLeft()).to.be.equal(true)
    expect(response.value.message).to.be.equal('Does not contain items for production')
  })

  it('3', async function () {
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
    useCase = new UseCase()
  })

  afterEach(function () {
    DomainEvents.clearMarkedAggregates()
  })
}
