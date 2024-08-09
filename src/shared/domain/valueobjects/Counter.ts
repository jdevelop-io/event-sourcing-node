import { ValueObject } from './ValueObject'

export class Counter extends ValueObject<number> {
  protected constructor(value: number) {
    super(value)
  }

  public static of(value: number): Counter {
    return new Counter(value)
  }

  public increment(): Counter {
    return Counter.of(this._value + 1)
  }

  public decrement(): Counter {
    if (this._value === 0) {
      return this
    }

    return Counter.of(this._value - 1)
  }

  protected override sanitize(value: number): number {
    return value
  }

  protected override validate(value: number): void {
    if (value < 0) {
      throw new RangeError(this.constructor.name + ' must be greater than or equal to 0')
    }
  }
}
