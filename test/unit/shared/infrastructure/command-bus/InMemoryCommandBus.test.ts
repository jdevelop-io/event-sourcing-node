import { InMemoryCommandBus } from '@/shared'
import { DummyAggregateId, DummyCommand, DummyCommandHandler } from '@test:unit'

describe('InMemoryCommandBus', () => {
  let commandBus: InMemoryCommandBus

  beforeEach(() => {
    commandBus = new InMemoryCommandBus()
  })

  describe('when there is no command handler registered', () => {
    it('should throw an error when trying to execute a command', async () => {
      await expect(commandBus.execute(new DummyCommand())).rejects.toThrow('Command handler for DummyCommand not found')
    })
  })

  describe('when there is a command handler registered', () => {
    it('should be called', async () => {
      const handler = new DummyCommandHandler()

      commandBus.register(DummyCommand, handler)

      const aggregateId = await commandBus.execute(new DummyCommand())
      expect(aggregateId).toBeInstanceOf(DummyAggregateId)
      expect((aggregateId as DummyAggregateId).unwrap()).toBe('42')
    })
  })
})
