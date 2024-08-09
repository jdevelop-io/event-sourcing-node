import { ClockServiceInterface, DomainEventInterface, NativeClockService } from '@/shared'

export abstract class DomainEvent<TId> implements DomainEventInterface {
  private _version?: number
  private readonly _occurredAt: Date

  public get version(): number {
    return this._version!
  }

  public get occurredAt(): Date {
    return this._occurredAt
  }

  protected constructor(
    public readonly aggregateId: TId,
    occurredAt?: Date,
    clockService: ClockServiceInterface = new NativeClockService()
  ) {
    this._occurredAt = occurredAt ?? clockService.now()
  }

  public withVersion(version: number): this {
    this._version = version

    return this
  }
}
