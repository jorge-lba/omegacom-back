import { expect } from 'chai'
import { CreateProductProps, Product } from '../Product'

export function ProductEntity () {
  it('should be create a new instance', function () {
    const data: CreateProductProps = {
      name: 'First Product',
      composition: [{
        itemId: 'f1a65d1fads35f1',
        quantity: 10
      }]
    }

    const product = Product.create(data)

    expect(product.id).to.an('string')
    expect(product.props).to.include(data)
  })

  it('should add itens in composition', function () {
    const product = Product.create({
      name: 'Composition Product'
    })

    product.addItemInComposition('1st', 10)
    product.addItemInComposition('2st', 5)

    const itens = product.props.composition
    expect(itens).to.length(2)
    expect(itens[0]).to.contain({
      itemId: '1st',
      quantity: 10
    })
    expect(itens[1]).to.contain({
      itemId: '2st',
      quantity: 5
    })
  })
}
