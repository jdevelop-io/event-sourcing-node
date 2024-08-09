import { AggregateId } from '@/shared'
import { DomainEvent } from './DomainEvent'
import { DomainEventInterface } from './DomainEventInterface'

export class AggregateChangedEvent<TId extends AggregateId<unknown>>
  extends DomainEvent<TId>
  implements DomainEventInterface {}
