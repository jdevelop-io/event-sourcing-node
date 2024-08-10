import { InMemoryEventBus, InMemoryEventStore } from '@/shared'
import { DummyAggregateId, DummyChangedEvent } from '@test:unit'

describe('InMemoryEventStore', () => {
  let eventBus: InMemoryEventBus
  let eventStore: InMemoryEventStore

  beforeEach(() => {
    eventBus = new InMemoryEventBus()
    eventStore = new InMemoryEventStore(eventBus)
  })

  it('should be empty when created', async () => {
    expect(eventStore.events.size).toBe(0)
  })

  describe('when no events for a stream', () => {
    it('should return an empty array', async () => {
      const events = await eventStore.getEventsForStream('stream')

      expect(events).toEqual([])
    })
  })

  describe('when there is events for a stream', () => {
    beforeEach(() => {
      eventStore.store('stream', [new DummyChangedEvent(DummyAggregateId.of('1'), 'foo')])
    })

    it('should return the events for the stream', async () => {
      const events = await eventStore.getEventsForStream('stream')

      expect(events).toEqual([new DummyChangedEvent(DummyAggregateId.of('1'), 'foo')])
    })

    it('should append the events to the stream', async () => {
      await eventStore.store('stream', [new DummyChangedEvent(DummyAggregateId.of('2'), 'bar')])

      const newEvents = await eventStore.getEventsForStream('stream')
      expect(newEvents).toEqual([
        new DummyChangedEvent(DummyAggregateId.of('1'), 'foo'),
        new DummyChangedEvent(DummyAggregateId.of('2'), 'bar'),
      ])
    })
  })
})
