import { DomainEventInterface } from '@/shared'

export interface EventHandlerInterface<TEvent extends DomainEventInterface> {
  handle(event: TEvent): Promise<void>
}
