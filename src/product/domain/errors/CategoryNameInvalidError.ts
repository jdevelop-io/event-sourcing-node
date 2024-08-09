import { DomainError } from '@/shared'

export class CategoryNameInvalidError extends DomainError {
  public readonly name = 'CategoryNameInvalidError'

  public constructor(message: string) {
    super(message)
  }
}
