import { Aggregate, DomainEventInterface } from '@/shared'
import { DummyAggregateId, DummyChangedEvent } from '@test:unit'

export class DummyAggregate extends Aggregate<DummyAggregateId> {
  public override get id(): DummyAggregateId {
    return DummyAggregateId.of('1')
  }

  public makeChange(value: string): void {
    this.record(new DummyChangedEvent(this.id, value))
  }
}

export class DummyAggregateWithApplier extends DummyAggregate {
  private _hasBeenApplied: boolean = false
  private _event?: DomainEventInterface
  private _value?: string

  public get value(): string | undefined {
    return this._value
  }

  public get hasBeenApplied(): boolean {
    return this._hasBeenApplied
  }

  public get event(): DomainEventInterface | undefined {
    return this._event
  }

  public applyDummyChangedEvent(event: DummyChangedEvent): void {
    this._hasBeenApplied = true
    this._event = event
    this._value = event.value
  }
}
