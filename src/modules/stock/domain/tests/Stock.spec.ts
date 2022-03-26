import { expect } from 'chai';
import faker from 'community-faker'

import { Stock } from '../Stock';
import { Item } from '../Item';
import { Product } from '../Product';

export const StockEntity = () => {
  it('should be create a new instance', ()=> {
    const data = {
      name: 'Offices',
      branch: 'Sorocaba - SP'
    }; 

    const stock =  Stock.create(data) as Stock;

    expect(stock.id).to.an('string');
    expect(stock.props).to.include(data)
  })

  it('should be include itens in stock', () => {
    const quantity = 20;
    const data = {
      name: 'Offices',
      branch: 'Sorocaba - SP'
    }; 

    const stock =  Stock.create(data) as Stock;

    for(let i = 0; i < quantity; i++) {
      const item = Item.create({
        name: faker.commerce.productName(),
        quantity: faker.datatype.number(500),
        description: faker.commerce.productDescription(),
      }) as Item

      stock.includeItem(item)
    }

    expect(stock.items.length).to.equal(quantity, 'items quantity')
  })

  it('should be include itens in stock', () => {
    const quantity = 5;
    const data = {
      name: 'Offices',
      branch: 'Sorocaba - SP'
    }; 

    const stock =  Stock.create(data) as Stock;

    for(let i = 0; i < quantity; i++) {
      const item = {
        name: faker.commerce.productName(),
        quantity: faker.datatype.number(50),
        description: faker.commerce.productDescription()
      }

      stock.includeItem(item)
    }

    const itemId = stock.items[0].id

    stock.removeItem(itemId)

    expect(stock.items.length).to.equal(quantity - 1, 'items quantity')
  })

  it('should be true if they contain items in stock for production', () => {
    const firstItem = {
      name: faker.commerce.productName(),
      quantity: 50,
      description: faker.commerce.productDescription() 
    }
    const data = {
      name: 'Offices',
      branch: 'Sorocaba - SP'
    }; 
    const product = Product.create({
      name: faker.commerce.productName()
    })
    
    const stock =  Stock.create(data) as Stock;
    stock.includeItem(firstItem)

    const itemId = stock.items[0].id
    product.addItemInComposition(itemId, 10)

    expect(
      stock.checkThePossibilityOfProducing(5, product)
    ).to.be.equal(true)
  })

  it('should be false if they do not contain items in stock for production', () => {
    const firstItem = Item.create({
      name: faker.commerce.productName(),
      quantity: 50,
      description: faker.commerce.productDescription() 
    })  as Item
    const data = {
      name: 'Offices',
      branch: 'Sorocaba - SP'
    }; 
    const product = Product.create({
      name: faker.commerce.productName()
    })
    const stock =  Stock.create(data) as Stock;
    product.addItemInComposition(firstItem.id, 10)
    stock.includeItem(firstItem)

    expect(
      stock.checkThePossibilityOfProducing(10, product)
    ).to.be.equal(false)
  })
}
