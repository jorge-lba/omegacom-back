import { IDomainEvent } from '@core/domain/events/IDomainEvent'
import { Production } from '../Production'

export class StartProductionEvent implements IDomainEvent {
  public dateTimeOccurred: Date;
  public production: Production;

  constructor (production: Production) {
    this.dateTimeOccurred = new Date()
    this.production = production
  }

  getAggregateId (): string {
    return this.production.id
  }
}
