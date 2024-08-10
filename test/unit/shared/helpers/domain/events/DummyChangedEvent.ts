import { AggregateChangedEvent } from '@/shared'
import { DummyAggregateId } from '@test:unit'

export class DummyChangedEvent extends AggregateChangedEvent<DummyAggregateId> {
  public override readonly name = DummyChangedEvent.name
}
