import { AggregateId, Version } from '@/shared'
import { DomainEventInterface } from './DomainEventInterface'

export abstract class DomainEvent<TId extends AggregateId<unknown>> implements DomainEventInterface {
  public abstract readonly name: string
  protected _version?: Version

  public get version(): Version {
    return this._version!
  }

  public constructor(public readonly aggregateId: TId) {}

  public withVersion(version: Version): this {
    this._version = version

    return this
  }
}
