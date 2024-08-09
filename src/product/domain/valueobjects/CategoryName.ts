import { CategoryNameInvalidError } from '@/product'
import { ValueObject } from '@/shared'

export class CategoryName extends ValueObject<string> {
  protected override sanitize(value: string): string {
    return value.trim()
  }

  protected override validate(value: string): void {
    if (!value) {
      throw new CategoryNameInvalidError('Category name must not be empty')
    }
  }

  public static of(name: string): CategoryName {
    return new CategoryName(name)
  }
}
