import { InMemoryEventBus } from '@/shared'
import { DummyAggregateId, DummyChangedEvent, DummyEventHandler } from '@test:unit'

describe('InMemoryEventBus', () => {
  let eventBus: InMemoryEventBus

  beforeEach(() => {
    eventBus = new InMemoryEventBus()
  })

  describe('when there is no event handler registered', () => {
    it('should not throw an error when trying to publish an event', async () => {
      await expect(eventBus.publish([new DummyChangedEvent(DummyAggregateId.of('42'), 'toz')])).resolves.not.toThrow()
    })
  })

  describe('when there is an event handler registered', () => {
    let dummyEventHandler: DummyEventHandler

    beforeEach(() => {
      dummyEventHandler = new DummyEventHandler()
      eventBus.register(DummyChangedEvent, dummyEventHandler)
    })

    it('should call the handler when publishing an event', async () => {
      const event = new DummyChangedEvent(DummyAggregateId.of('42'), 'bar')
      await eventBus.publish([event])
      expect(dummyEventHandler.hasBeenCalled).toBe(true)
    })
  })
})
