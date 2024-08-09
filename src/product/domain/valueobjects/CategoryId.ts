import { ValueObject } from '@/shared'

export class CategoryId extends ValueObject<string> {
  public static of(value: string): CategoryId {
    return new CategoryId(value)
  }

  protected override sanitize(value: string): string {
    return value
  }

  protected override validate(): void {}
}
