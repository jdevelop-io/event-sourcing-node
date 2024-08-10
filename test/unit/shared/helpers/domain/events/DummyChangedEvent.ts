import { AggregateChangedEvent } from '@/shared'
import { DummyAggregateId } from '@test:unit'

export class DummyChangedEvent extends AggregateChangedEvent<DummyAggregateId> {
  public constructor(
    aggregateId: DummyAggregateId,
    public readonly value: string
  ) {
    super(aggregateId, { value })
  }
}
