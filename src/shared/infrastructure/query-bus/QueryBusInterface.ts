import { QueryHandlerInterface, QueryInterface } from '@/shared'

export interface QueryBusInterface {
  register(query: QueryInterface, handler: QueryHandlerInterface<QueryInterface>): void
  execute(query: QueryInterface): Promise<unknown>
}
