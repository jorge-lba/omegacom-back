import { UseCase } from '@core/domain/UseCase'
import { Either, left, right } from '@core/shared/logic/Either'
import { Production } from '@modules/production/domain/Production'
import { ProductionRepository } from '@modules/production/repositories/ProductionRepository'
import { DoesNotContainItemsForProductionError } from '../../errors/DoesNotContainItemsForProductionError'

class StartProductionUseCase implements UseCase<RequestStartProduction, ResponseStartProduction> {
  constructor (private productionRepository: ProductionRepository) {}

  async execute (request?: RequestStartProduction): Promise<ResponseStartProduction> {
    if (!request?.items || request.items.length <= 0) {
      return left(
        new DoesNotContainItemsForProductionError(
          'Does not contain items for production'
        )
      )
    }

    const productionOrError = Production.create({
      deliveryDate: request.deliveryDate
    })

    if (productionOrError.isLeft()) {
      return left(productionOrError.value)
    }

    const production = productionOrError.value

    request.items.forEach(({ productId, quantity }) =>
      production.includeProduct(productId, quantity)
    )

    production.start()

    this.productionRepository.save(production)

    return right({
      message: 'Production started successfully'
    })
  }
}

type RequestStartProduction = {
  items: {
    productId: string,
    quantity: number
  }[],
  deliveryDate: Date
}

type ResponseOk = {
  message: string;
}

type ResponseStartProduction = Either<Error, ResponseOk>

export { StartProductionUseCase }
