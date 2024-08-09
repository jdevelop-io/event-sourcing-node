import { QueryHandlerInterface, QueryInterface } from '@/shared'

export class DummyQuery implements QueryInterface {
  public readonly name: string = DummyQuery.name
}

export class DummyQueryHandler implements QueryHandlerInterface<DummyQuery> {
  public async handle(): Promise<{ hello: 'world' }> {
    return { hello: 'world' }
  }
}
