import faker from 'community-faker'
import { DomainEvents } from '@core/domain/events/DomainEvents'
import { Product } from '@modules/stock/domain/Product'
import { expect } from 'chai'
import { Production } from '../Production'

export function ProductionEntity () {
  it('should be create a new instance', function () {
    const production = Production.create()

    expect(production.id).to.an('string')
  })

  it('should send a new event to start production', function () {
    const production = Production.create()
    production.start()
    const markedAggregates = Object
      .getOwnPropertyDescriptors(DomainEvents)
      .markedAggregates

    expect(markedAggregates.value).to.length(1)
    expect(markedAggregates.value[0]?.id).to.be.equals(production.id)
  })

  it('should be include products to production', function () {
    const product = Product.create({
      name: faker.commerce.productName()
    })
    const production = Production.create()
    production.includeProduct(product, 10)
    production.includeProduct(product, 10)
    production.includeProduct(product, 10)

    expect(production.listProducts()).to.length(3)
  })
}
