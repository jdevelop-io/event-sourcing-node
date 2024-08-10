import { Version } from '@/shared'
import { DummyAggregate, DummyAggregateId, DummyAggregateWithApplier, DummyChangedEvent } from '@test:unit'

describe('Aggregate', () => {
  let dummyAggregate: DummyAggregate
  let dummyAggregateWithApplier: DummyAggregateWithApplier

  beforeEach(() => {
    dummyAggregate = new DummyAggregate()
    dummyAggregateWithApplier = new DummyAggregateWithApplier()
  })

  it('should have an identifier', () => {
    expect(dummyAggregate.id).toBeInstanceOf(DummyAggregateId)
    expect(dummyAggregate.id.unwrap()).toBe('1')
  })

  describe('version', () => {
    it('should be 0 by default', () => {
      expect(dummyAggregate.version).toBeInstanceOf(Version)
      expect(dummyAggregate.version.unwrap()).toBe(0)
    })

    it('should increment by 1 for each change', () => {
      dummyAggregate.makeChange('foo')
      expect(dummyAggregate.version.unwrap()).toBe(1)

      dummyAggregate.makeChange('bar')
      expect(dummyAggregate.version.unwrap()).toBe(2)
    })
  })

  describe('can be handled by an event applier inside the aggregate', () => {
    describe('if the event applier is not defined', () => {
      it('should not throw an error', () => {
        expect(() => {
          dummyAggregate.makeChange('foo')
        }).not.toThrow()
      })
    })

    describe('if the event applier is defined', () => {
      it('should not have been applied by default', () => {
        expect(dummyAggregateWithApplier.hasBeenApplied).toBe(false)
        expect(dummyAggregateWithApplier.event).toBeUndefined()
      })

      it('should have been applied after the event has been recorded', () => {
        dummyAggregateWithApplier.makeChange('bar')
        expect(dummyAggregateWithApplier.hasBeenApplied).toBe(true)
        expect(dummyAggregateWithApplier.event).toBeInstanceOf(DummyChangedEvent)
        expect(dummyAggregateWithApplier.event!.version).toBe(dummyAggregateWithApplier.version)
      })
    })
  })

  describe('events', () => {
    it('should be recorded', () => {
      dummyAggregate.makeChange('foo')
      expect(dummyAggregate.pullUncommittedEvents()).toHaveLength(1)
    })

    it('should be cleared after being pulled', () => {
      dummyAggregate.makeChange('bar')
      dummyAggregate.pullUncommittedEvents()
      expect(dummyAggregate.pullUncommittedEvents()).toHaveLength(0)
    })
  })

  describe('reconstitution from history events', () => {
    it('should reapply the events', () => {
      const dummyAggregateId = DummyAggregateId.of('1')
      const dummyChangedEvent1 = new DummyChangedEvent(dummyAggregateId, 'foo').withVersion(Version.of(1))
      const dummyChangedEvent2 = new DummyChangedEvent(dummyAggregateId, 'bar').withVersion(Version.of(2))

      const reconstitutedDummyAggregate = DummyAggregateWithApplier.reconstitute([
        dummyChangedEvent1,
        dummyChangedEvent2,
      ])
      expect(reconstitutedDummyAggregate).toBeInstanceOf(DummyAggregateWithApplier)
      expect(reconstitutedDummyAggregate.version.unwrap()).toBe(2)
      expect(reconstitutedDummyAggregate.id).toStrictEqual(dummyAggregateId)
      expect((reconstitutedDummyAggregate as DummyAggregateWithApplier).value).toBe('bar')
      expect(reconstitutedDummyAggregate.pullUncommittedEvents()).toHaveLength(0)
    })
  })
})
