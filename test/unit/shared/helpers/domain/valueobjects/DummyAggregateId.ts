import { AggregateId } from '@/shared'

export class DummyAggregateId extends AggregateId<string> {
  public static of(value: string): DummyAggregateId {
    return new DummyAggregateId(value)
  }

  protected override sanitize(value: string): string {
    return value
  }

  protected override validate(): void {}
}
