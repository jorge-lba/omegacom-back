import { expect } from 'chai'
import { StartProductionUseCase as UseCase } from './StartProductionUseCase'

export function StartProductionUseCase () {
  let useCase: UseCase

  it('d', async function () {
    const response = await useCase.execute({
      items: [{
        productId: 'dsa',
        quantity: 10
      }]
    })

    expect(response.isRight()).to.be.equal(true)
    expect(response.value.message).to.be.equal('Production started successfully')
  })

  it('2', async function () {
    const response = await useCase.execute()

    expect(response.isLeft()).to.be.equal(true)
    expect(response.value.message).to.be.equal('Does not contain items for production')
  })

  beforeEach(function () {
    useCase = new UseCase()
  })
}
