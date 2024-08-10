import { AggregateId, Version } from '@/shared'
import { DomainEventInterface } from './DomainEventInterface'

export abstract class DomainEvent<TId extends AggregateId<unknown>> implements DomainEventInterface {
  protected _version?: Version

  public get version(): Version {
    return this._version!
  }

  protected constructor(
    public readonly aggregateId: TId,
    public readonly payload: Record<string, unknown>
  ) {}

  public withVersion(version: Version): this {
    this._version = version

    return this
  }
}
