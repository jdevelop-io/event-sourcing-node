import { DomainEventInterface } from '@/shared'

export abstract class Aggregate {
  private _version: number = 0
  private readonly _events: DomainEventInterface[] = []

  public get version(): number {
    return this._version
  }

  public pullEvents(): DomainEventInterface[] {
    const events = [...this._events]

    this._events.length = 0

    return events
  }

  public record(event: DomainEventInterface): void {
    this._version++

    const eventWithVersion = event.withVersion(this._version)
    this._events.push(eventWithVersion)

    this.apply(eventWithVersion)
  }

  private apply(event: DomainEventInterface): void {
    const handler = this._getHandlerName(event)

    handler.call(this, event)
  }

  private _getHandlerName(event: DomainEventInterface): (event: DomainEventInterface) => void {
    const handlerName = `apply${event.constructor.name}`

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handler = (this as any)[handlerName]

    if (typeof handler === 'function') {
      return handler
    }

    throw new Error(`Missing handler ${handlerName} on ${this.constructor.name}`)
  }
}
