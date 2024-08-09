import { DomainEventInterface } from '@/shared'
import { EventStoreInterface } from './interfaces/EventStoreInterface.ts'

export class InMemoryEventStore implements EventStoreInterface {
  private readonly _events: Map<string, DomainEventInterface[]> = new Map()

  public get events(): Map<string, DomainEventInterface[]> {
    return this._events
  }

  public async store(streamName: string, events: DomainEventInterface[]): Promise<void> {
    const currentEvents = this._events.get(streamName) || []
    this._events.set(streamName, [...currentEvents, ...events])
  }

  public async getEventsForStream(streamName: string): Promise<DomainEventInterface[]> {
    return this._events.get(streamName) || []
  }
}
