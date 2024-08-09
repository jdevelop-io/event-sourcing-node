import { QueryHandlerInterface } from './QueryHandlerInterface'
import { QueryInterface } from './QueryInterface'

export interface QueryBusInterface {
  register(query: QueryInterface, handler: QueryHandlerInterface<QueryInterface>): void
  execute(query: QueryInterface): Promise<unknown>
}
