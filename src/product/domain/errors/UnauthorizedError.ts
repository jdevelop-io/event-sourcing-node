import { DomainError } from '@/shared'

export class UnauthorizedError extends DomainError {
  public readonly name = 'UnauthorizedError'
  public override readonly message = 'Unauthorized'
}
