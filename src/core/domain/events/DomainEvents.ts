
import { IDomainEvent } from './IDomainEvent'
import { AggregateRoot } from '../AggregateRoot'

export class DomainEvents {
  private static handlersMap: { [key:string]: any } = {};
  private static markedAggregates: AggregateRoot<any>[] = [];

  public static markAggregateForDispatch (aggregate: AggregateRoot<any>): void {
    const aggregateFound = !!this.findMarkedAggregateByID(aggregate.id)

    if (!aggregateFound) {
      this.markedAggregates.push(aggregate)
    }
  }

  private static dispatchAggregateEvents (aggregate: AggregateRoot<any>): void {
    aggregate.domainEvents.forEach((event: IDomainEvent) => this.dispatch(event))
  }

  private static removeAggregateFromMarkedDispatchList (aggregate: AggregateRoot<any>): void {
    const index = this.markedAggregates.findIndex((a) => a.equals(aggregate))
    this.markedAggregates.splice(index, 1)
  }

  private static findMarkedAggregateByID (id: string): AggregateRoot<any> | null {
    let found: AggregateRoot<any> | null = null
    for (const aggregate of this.markedAggregates) {
      if (aggregate.id === id) {
        found = aggregate
      }
    }

    return found
  }

  public static dispatchEventsForAggregate (id: string): void {
    const aggregate = this.findMarkedAggregateByID(id)

    if (aggregate) {
      this.dispatchAggregateEvents(aggregate)
      aggregate.clearEvents()
      this.removeAggregateFromMarkedDispatchList(aggregate)
    }
  }

  public static register (callback: (event: IDomainEvent) => void, eventClassName: string): void {
    if (!Object.prototype.hasOwnProperty.call(this.handlersMap, eventClassName)) {
      this.handlersMap[eventClassName] = []
    }
    this.handlersMap[eventClassName].push(callback)
  }

  public static clearHandlers (): void {
    this.handlersMap = {}
  }

  public static clearMarkedAggregates (): void {
    this.markedAggregates = []
  }

  private static dispatch (event: IDomainEvent): void {
    const eventClassName: string = event.constructor.name

    if (Object.prototype.hasOwnProperty.call(this.handlersMap, eventClassName)) {
      const handlers: any[] = this.handlersMap[eventClassName]
      for (const handler of handlers) {
        handler(event)
      }
    }
  }
}
