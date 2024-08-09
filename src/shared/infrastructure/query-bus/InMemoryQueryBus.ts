import { QueryBusInterface, QueryHandlerInterface, QueryInterface } from '@/shared'

export class InMemoryQueryBus implements QueryBusInterface {
  private _handlers: Map<string, QueryHandlerInterface<QueryInterface>> = new Map()

  public register(query: QueryInterface, handler: QueryHandlerInterface<QueryInterface>): void {
    this._handlers.set(query.name, handler)
  }

  public async execute(query: QueryInterface): Promise<unknown> {
    const handler = this._handlers.get(query.name)

    if (!handler) {
      throw new Error(`Query handler for ${query.name} not found`)
    }

    return handler.handle(query)
  }
}
