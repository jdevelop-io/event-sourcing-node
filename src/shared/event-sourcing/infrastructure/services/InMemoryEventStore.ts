import { DomainEventInterface, EventStoreInterface } from '@/shared'

export class InMemoryEventStore implements EventStoreInterface {
  private readonly _events = new Map<string, DomainEventInterface[]>()

  public create(aggregateType: string, aggregateId: string, events: DomainEventInterface[]): void {
    const key = this._getEventsKey(aggregateType, aggregateId)
    this._events.set(key, events)
  }

  public getEvents(aggregateType: string, aggregateId: string): DomainEventInterface[] {
    const key = this._getEventsKey(aggregateType, aggregateId)
    return this._events.get(key) || []
  }

  private _getEventsKey(aggregateType: string, aggregateId: string): string {
    return `${aggregateType}:${aggregateId}`
  }
}
