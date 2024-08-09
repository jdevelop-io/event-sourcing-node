import { CategoryId, CategoryName } from '@/product'
import { AggregateChangedEvent } from '@/shared'

export class CategoryCreatedEvent extends AggregateChangedEvent<CategoryId> {
  public constructor(
    aggregateId: CategoryId,
    public readonly name: CategoryName
  ) {
    super(aggregateId, { name })
  }
}
