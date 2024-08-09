import { InMemoryEventStore } from '@/shared'

describe('InMemoryEventStore', () => {
  let eventStore: InMemoryEventStore

  beforeEach(() => {
    eventStore = new InMemoryEventStore()
  })

  it('empty events', () => {
    expect(eventStore.getEvents('aggregateType', 'aggregateId')).toEqual([])
  })
})
