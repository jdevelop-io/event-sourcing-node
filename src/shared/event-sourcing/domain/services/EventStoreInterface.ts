import { DomainEventInterface } from '@/shared'

export interface EventStoreInterface {
  create(aggregateType: string, aggregateId: string, events: DomainEventInterface[]): void
}
