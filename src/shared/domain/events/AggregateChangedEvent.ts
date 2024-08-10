import { AggregateId } from '@/shared'
import { DomainEvent } from './DomainEvent'
import { DomainEventInterface } from './DomainEventInterface'

export class AggregateChangedEvent<TId extends AggregateId<unknown>>
  extends DomainEvent<TId>
  implements DomainEventInterface
{
  public constructor(aggregateId: TId, payload: Record<string, unknown>) {
    super(aggregateId, payload)
  }
}
