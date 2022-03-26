import { AggregateRoot } from '@core/domain/AggregateRoot'
import { StartProductionEvent } from './events/StartProductionEvent'

export class Production extends AggregateRoot<ProductionProps> {
  start () {
    this.addDomainEvent(new StartProductionEvent(this))
  }

  static create () {
    return new Production({})
  }
}

interface ProductionProps {

}
