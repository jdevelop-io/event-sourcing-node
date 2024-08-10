import { DomainEventInterface, EventHandlerInterface } from '@/shared'
import { EventBusInterface } from './interfaces/EventBusInterface'

export class InMemoryEventBus implements EventBusInterface {
  private _events: DomainEventInterface[] = []
  private _handlers: Map<string, EventHandlerInterface<DomainEventInterface>> = new Map()

  public register<T extends DomainEventInterface>(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    eventClass: { new (...args: any[]): T; name: string },
    handler: EventHandlerInterface<T>
  ): void {
    this._handlers.set(eventClass.name, handler)
  }

  public async publish(events: DomainEventInterface[]): Promise<void> {
    this._events.push(...events)

    for (const event of events) {
      const handler = this._handlers.get(event.constructor.name)

      if (!handler) {
        continue
      }

      await handler.handle(event)
    }
  }
}
