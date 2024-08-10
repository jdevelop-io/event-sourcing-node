import { AggregateId, DomainEventInterface, Version } from '@/shared'

export abstract class Aggregate<TId extends AggregateId<unknown>> {
  private _version: Version = new Version()
  private _uncommittedEvents: DomainEventInterface[] = []

  public abstract get id(): TId

  public get version(): Version {
    return this._version
  }

  private withVersion(version: Version): this {
    this._version = version

    return this
  }

  public pullUncommittedEvents(): DomainEventInterface[] {
    const events = [...this._uncommittedEvents]

    this._uncommittedEvents.length = 0

    return events
  }

  protected record(event: DomainEventInterface): void {
    this._version = this._version.increment()

    const versionedEvent = event.withVersion(this._version)
    this._uncommittedEvents.push(versionedEvent)

    this.apply(versionedEvent)
  }

  public apply(event: DomainEventInterface): void {
    const handler = this._getEventHandler(event)

    if (!handler) {
      return
    }

    handler.call(this, event)
  }

  private _getEventHandler(event: DomainEventInterface): ((event: DomainEventInterface) => void) | undefined {
    const handlerName = `apply${event.constructor.name}`

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return (this as any)[handlerName]
  }

  public static reconstitute<T extends Aggregate<AggregateId<unknown>>>(
    this: new () => T,
    events: DomainEventInterface[]
  ): T {
    const aggregate = new this()

    events.forEach((event) => {
      aggregate.withVersion(event.version)
      aggregate.apply(event)
    })

    return aggregate
  }
}
