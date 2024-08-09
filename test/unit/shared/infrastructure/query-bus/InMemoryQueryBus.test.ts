import { InMemoryQueryBus } from '@/shared'
import { DummyQuery, DummyQueryHandler } from '@test:unit'

describe('InMemoryQueryBus', () => {
  let queryBus: InMemoryQueryBus

  beforeEach(() => {
    queryBus = new InMemoryQueryBus()
  })

  describe('when there is no query handler registered', () => {
    it('should throw an error when trying to execute a query', async () => {
      await expect(queryBus.execute(new DummyQuery())).rejects.toThrow('Query handler for DummyQuery not found')
    })
  })

  describe('when there is a query handler registered', () => {
    it('should be called', async () => {
      const handler = new DummyQueryHandler()

      queryBus.register(DummyQuery, handler)

      const response = await queryBus.execute(new DummyQuery())
      expect(response).toEqual({ hello: 'world' })
    })
  })
})
