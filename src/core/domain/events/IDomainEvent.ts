interface IDomainEvent {
  dateTimeOccurred: Date;
  getAggregateId (): string;
}

type IDomainEventFunction = (event: IDomainEvent) => void

export { IDomainEvent, IDomainEventFunction }