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
      dummyAggregate.makeChange()
      expect(dummyAggregate.version.unwrap()).toBe(1)

      dummyAggregate.makeChange()
      expect(dummyAggregate.version.unwrap()).toBe(2)
    })
  })

  describe('can be handled by an event applier inside the aggregate', () => {
    describe('if the event applier is not defined', () => {
      it('should not throw an error', () => {
        expect(() => {
          dummyAggregate.makeChange()
        }).not.toThrow()
      })
    })

    describe('if the event applier is defined', () => {
      it('should not have been applied by default', () => {
        expect(dummyAggregateWithApplier.hasBeenApplied).toBe(false)
        expect(dummyAggregateWithApplier.event).toBeUndefined()
      })

      it('should have been applied after the event has been recorded', () => {
        dummyAggregateWithApplier.makeChange()
        expect(dummyAggregateWithApplier.hasBeenApplied).toBe(true)
        expect(dummyAggregateWithApplier.event).toBeInstanceOf(DummyChangedEvent)
        expect(dummyAggregateWithApplier.event!.version).toBe(dummyAggregateWithApplier.version)
      })
    })
  })
})
