import { UseCase } from '@core/domain/UseCase'
import { Either, left, right } from '@core/shared/logic/Either'
import { DoesNotContainItemsForProductionError } from '../../errors/DoesNotContainItemsForProductionError'

class StartProductionUseCase implements UseCase<RequestStartProduction, ResponseStartProduction> {
  async execute (request?: RequestStartProduction): Promise<ResponseStartProduction> {
    if (!request?.items || request.items.length <= 0) {
      return left(
        new DoesNotContainItemsForProductionError(
          'Does not contain items for production'
        )
      )
    }

    return right({
      message: 'Production started successfully'
    })
  }
}

type RequestStartProduction = {
  items: {
    productId: string,
    quantity: number
  }[]
}

type ResponseOk = {
  message: string;
}

type ResponseStartProduction = Either<Error, ResponseOk>

export { StartProductionUseCase }
