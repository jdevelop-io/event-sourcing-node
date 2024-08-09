import { InMemoryEventStore } from '@/shared'
import { DummyAggregateId, DummyChangedEvent } from '@test:unit'

describe('InMemoryEventStore', () => {
  let eventStore: InMemoryEventStore

  beforeEach(() => {
    eventStore = new InMemoryEventStore()
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
      eventStore.store('stream', [new DummyChangedEvent(DummyAggregateId.of('1'))])
    })

    it('should return the events for the stream', async () => {
      const events = await eventStore.getEventsForStream('stream')

      expect(events).toEqual([new DummyChangedEvent(DummyAggregateId.of('1'))])
    })

    it('should append the events to the stream', async () => {
      await eventStore.store('stream', [new DummyChangedEvent(DummyAggregateId.of('2'))])

      const newEvents = await eventStore.getEventsForStream('stream')
      expect(newEvents).toEqual([
        new DummyChangedEvent(DummyAggregateId.of('1')),
        new DummyChangedEvent(DummyAggregateId.of('2')),
      ])
    })
  })
})
