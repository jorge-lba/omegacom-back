import { expect } from 'chai';
import faker from 'community-faker'
import { InsufficientQuantityError } from '../errors/InsufficientQuantityError';

import { Item } from '../Item';

export const ItemEntity = () => {
  it('should be create a new instance', ()=> {
    const data = {
      name: faker.commerce.productName(),
      quantity: faker.datatype.number(50),
      description: faker.commerce.productDescription()
    }; 

    const item = Item.create(data)  as Item

    expect(item.id).to.an('string');
    expect(item.props).to.include(data)
  })

  it('should be sum quantity', () => {
    const data = {
      name: faker.commerce.productName(),
      quantity: 50,
      description: faker.commerce.productDescription()
    }; 

    const item = Item.create(data)  as Item
    item.addQuantity(50)

    expect(item.props.quantity).to.equal(100)
  })

  it('should be sub quantity', () => {
    const data = {
      name: faker.commerce.productName(),
      quantity: 50,
      description: faker.commerce.productDescription()
    }; 

    const item = Item.create(data)  as Item
    item.removeQuantity(25)

    expect(item.props.quantity).to.equal(25)
  })

  it('should return an error when removing an amount and the total is negative', () => {
    const data = {
      name: 'Item Name',
      quantity: 20,
    }; 

    const item = Item.create(data)  as Item
    item.removeQuantity(25)
    const errors = item.errors
    const errorValue = errors.values().next().value

    expect(errors.size).to.equal(1)
    expect(errorValue.id).to.be.a('string')
    expect(errorValue.message)
      .to.equals('Insufficient quantity. item: Item Name - quantity: 20')
    expect(errorValue).to.instanceOf(InsufficientQuantityError)
  })
}
