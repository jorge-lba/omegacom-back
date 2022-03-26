import { expect } from 'chai'
import { Entity } from './Entity'
import { DomainError } from './errors/DomainError'

interface TestEntityProps {}
class TestDomainError extends DomainError {
  constructor () {
    super({
      message: 'test error',
      context: 'Test',
      name: 'Test Error'
    })
  }
}

class TestEntity extends Entity<TestEntityProps> {
  static create () {
    return new TestEntity({})
  }

  forceError () {
    this.includeNewError(new TestDomainError())
  }
}

export const TEntity = () => {
  it('should be false case first TestEntity not is equal second TestEntity', function () {
    const testEntityFirst = TestEntity.create()
    const testEntitySecond = TestEntity.create()

    expect(testEntityFirst.equals(testEntitySecond)).to.be.equal(false)
  })

  it('should be false case second TestEntity is undefined', function () {
    const testEntityFirst = TestEntity.create()
    const testEntitySecond = undefined

    expect(testEntityFirst.equals(testEntitySecond)).to.be.equal(false)
  })

  it('should be false case second TestEntity not is entity', function () {
    const testEntityFirst = TestEntity.create()
    const testEntitySecond = { id: '546541354' }

    // @ts-ignore
    expect(testEntityFirst.equals(testEntitySecond)).to.be.equal(false)
  })

  it('should be true case second TestEntity is equal the first', function () {
    const testEntityFirst = TestEntity.create()
    const testEntitySecond = testEntityFirst

    expect(testEntityFirst.equals(testEntitySecond)).to.be.equal(true)
  })

  it('should be included one domain error in entity', function () {
    const testEntity = TestEntity.create()
    testEntity.forceError()

    expect(testEntity.errors).to.length(1)
  })

  it('should not be valid if it contains errors', function () {
    const testEntity = TestEntity.create()
    testEntity.forceError()
    expect(testEntity.isValid()).to.be.equal(false)
  })

  it('should be valid if it does not contain errors', function () {
    const testEntity = TestEntity.create()
    testEntity.forceError()
    expect(testEntity.isValid()).to.be.equal(false)
  })
}
