import { DomainEventInterface } from '@/shared'

export interface EventStoreInterface {
  store(streamName: string, events: DomainEventInterface[]): Promise<void>
  getEventsForStream(streamName: string): Promise<DomainEventInterface[]>
}
