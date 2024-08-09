import { DomainError } from '@/shared'

export class CategoryAlreadyExistsError extends DomainError {
  public readonly name = 'CategoryAlreadyExistsError'
  public override readonly message = 'Category already exists'
}
