import { Suite } from 'mocha'
import { TEntity } from '@core/domain/Entity.spec'

import { StockEntity } from '@modules/stock/domain/tests/Stock.spec'
import { ItemEntity } from '@modules/stock/domain/tests/Item.spec'
import { ProductEntity } from '@modules/stock/domain/tests/Product.spec'
import { CreateStockUseCase } from '@modules/stock/useCases/commands/createStock/CreateStockUseCase.spec'
import { IncludeItemsInStockUseCase } from '@modules/stock/useCases/commands/includeItemsInStock/IncludeItemsInStockUseCase.spec'
import { ProductionEntity } from '@modules/production/domain/tests/Production.spec'
import { StartProductionUseCase } from '@modules/production/useCases/commands/startProduction/StartProductionUseCase.spec'

describe('Core Domain', function (this: Suite) {
  describe('Entity', TEntity)
})

describe('Module - Stock', function (this: Suite) {
  describe('Entities', function (this: Suite) {
    describe('Stock', StockEntity)
    describe('Item', ItemEntity)
    describe('Product', ProductEntity)
  })

  describe('Use Cases', function (this: Suite) {
    describe('Create', CreateStockUseCase)
    describe('Include Items', IncludeItemsInStockUseCase)
  })
})

describe('Module - Production', function (this: Suite) {
  describe('Entities', function (this: Suite) {
    describe('Production', ProductionEntity)
  })

  describe('Use Case', function (this: Suite) {
    describe('Start Production', StartProductionUseCase)
  })
})
