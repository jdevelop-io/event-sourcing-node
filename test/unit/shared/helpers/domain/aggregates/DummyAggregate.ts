import { Aggregate, DomainEventInterface } from '@/shared'
import { DummyAggregateId, DummyChangedEvent } from '@test:unit'

export class DummyAggregate extends Aggregate<DummyAggregateId> {
  public override get id(): DummyAggregateId {
    return DummyAggregateId.of('1')
  }

  public makeChange(): void {
    this.record(new DummyChangedEvent(this.id))
  }
}

export class DummyAggregateWithApplier extends DummyAggregate {
  private _hasBeenApplied: boolean = false
  private _event?: DomainEventInterface

  public get hasBeenApplied(): boolean {
    return this._hasBeenApplied
  }

  public get event(): DomainEventInterface | undefined {
    return this._event
  }

  public applyDummyChangedEvent(event: DomainEventInterface): void {
    this._hasBeenApplied = true
    this._event = event
  }
}
