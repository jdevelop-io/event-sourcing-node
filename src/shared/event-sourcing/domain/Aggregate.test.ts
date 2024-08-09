import { Aggregate, DomainEvent } from '@/shared'

class FakeEvent extends DomainEvent<string> {
  public constructor(aggregateId: string) {
    super(aggregateId)
  }
}

class FakeAggregateWithoutHandler extends Aggregate {
  public static create(): FakeAggregateWithoutHandler {
    const instance = new FakeAggregateWithoutHandler()
    instance.record(new FakeEvent('1'))
    return instance
  }
}

class FakeAggregate extends Aggregate {
  private _hasBeenCalled: boolean = false

  public get hasBeenCalled(): boolean {
    return this._hasBeenCalled
  }

  public static create(): FakeAggregate {
    const instance = new FakeAggregate()
    instance.record(new FakeEvent('1'))
    return instance
  }

  protected applyFakeEvent(): void {
    this._hasBeenCalled = true
  }
}

describe('Aggregate', () => {
  it('should have apply handler for all events recorded', () => {
    expect(() => {
      FakeAggregateWithoutHandler.create()
    }).toThrow('Missing handler applyFakeEvent on FakeAggregate')
  })

  it('should call the apply handler for all events recorded', () => {
    const aggregate = FakeAggregate.create()
    expect(aggregate.hasBeenCalled).toBe(true)
  })

  describe('version', () => {
    it('should start with 0', () => {
      const aggregate = new FakeAggregate()
      expect(aggregate.version).toBe(0)
    })

    it('should increment by 1 for each event recorded', () => {
      const aggregate = FakeAggregate.create()
      expect(aggregate.version).toBe(1)
    })
  })
})
