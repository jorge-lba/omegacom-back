import { DomainEvents } from '@core/domain/events/DomainEvents'
import { expect } from 'chai'
import { Production } from '../Production'

export function ProductionEntity () {
  it('should be create a new instance', function () {
    const production = Production.create({ deliveryDate: new Date() }).value as Production

    expect(production.id).to.an('string')
  })

  it('should send a new event to start production', function () {
    const production = Production.create({ deliveryDate: new Date() }).value as Production
    production.start()
    const markedAggregates = Object
      .getOwnPropertyDescriptors(DomainEvents)
      .markedAggregates

    expect(markedAggregates.value).to.length(1)
    expect(markedAggregates.value[0]?.id).to.be.equals(production.id)
  })

  it('should be include products to production', function () {
    const production = Production.create({ deliveryDate: new Date() }).value as Production
    production.includeProduct('48645', 10)
    production.includeProduct('asd489', 10)
    production.includeProduct('c61a5s', 10)

    expect(production.listProducts()).to.length(3)
  })

  afterEach(function () {
    DomainEvents.clearMarkedAggregates()
  })
}
