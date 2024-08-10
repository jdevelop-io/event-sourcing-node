import { DomainEventInterface } from '@/shared'

export interface EventHandlerInterface<Event extends DomainEventInterface> {
  handle(event: Event): Promise<void>
}
