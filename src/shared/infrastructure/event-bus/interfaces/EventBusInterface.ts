import { DomainEventInterface, EventHandlerInterface } from '@/shared'

export interface EventBusInterface {
  register<T extends DomainEventInterface>(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    eventClass: { new (...args: any[]): T; name: string },
    handler: EventHandlerInterface<T>
  ): void
  publish(events: DomainEventInterface[]): Promise<void>
}
