import { AggregateChangedEvent, Version } from '@/shared'
import { DummyAggregateId } from '@test:unit'

describe('AggregateChangedEvent', () => {
  it('version should be undefined by default', () => {
    const event = new AggregateChangedEvent(DummyAggregateId.of('1'), { foo: 'bar' })
    expect(event.version).toBeUndefined()
  })

  it('should have a version', () => {
    const event = new AggregateChangedEvent(DummyAggregateId.of('1'), { foo: 'bar' }).withVersion(Version.of(1))
    expect(event.version).toBeDefined()
    expect(event.version.unwrap()).toBe(1)
  })
})
