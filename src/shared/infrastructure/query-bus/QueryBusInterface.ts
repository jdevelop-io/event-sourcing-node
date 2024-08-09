import { QueryHandlerInterface } from '../../application/queries/interfaces/QueryHandlerInterface.ts'
import { QueryInterface } from '../../application/queries/interfaces/QueryInterface.ts'

export interface QueryBusInterface {
  register(query: QueryInterface, handler: QueryHandlerInterface<QueryInterface>): void
  execute(query: QueryInterface): Promise<unknown>
}
