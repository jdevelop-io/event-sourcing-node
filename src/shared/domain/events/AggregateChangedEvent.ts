import { DomainEvent } from './DomainEvent'

export class AggregateChangedEvent<TId> extends DomainEvent<TId> {
  public readonly payload: Record<string, unknown>

  public constructor(aggregateId: TId, payload: Record<string, unknown>, occurredAt: Date = new Date()) {
    super(aggregateId, occurredAt)

    this.payload = payload
  }
}
