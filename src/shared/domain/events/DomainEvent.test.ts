import { ClockServiceInterface, DomainEvent, FrozenClockService } from '@/shared'

class FakeEvent extends DomainEvent<string> {
  public constructor(aggregateId: string, occurredAt?: Date, clockService?: ClockServiceInterface) {
    super(aggregateId, occurredAt, clockService)
  }
}

describe('DomainEvent', () => {
  const currentDate = new Date('2024-01-01T09:30:40.500Z')
  const fakeEvent = new FakeEvent('1', undefined, new FrozenClockService(currentDate))

  describe('version', () => {
    it('should be undefined', () => {
      expect(fakeEvent.version).toBeUndefined()
    })

    it('should be set to the value provided', () => {
      const version = 1
      const event = fakeEvent.withVersion(version)

      expect(event.version).toBe(version)
    })
  })

  describe('occurred date', () => {
    it('should be set to the current date if not provided', () => {
      expect(fakeEvent.occurredAt).toEqual(currentDate)
    })

    it('should be set to the value provided', () => {
      const occurredAt = new Date('2023-01-01T09:30:40.500Z')
      const event = new FakeEvent('1', occurredAt)

      expect(event.occurredAt).toEqual(occurredAt)
    })
  })
})
