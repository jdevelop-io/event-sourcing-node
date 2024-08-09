import { QueryInterface } from './QueryInterface.ts'

export interface QueryHandlerInterface<Query extends QueryInterface> {
  handle(query: Query): Promise<unknown>
}
