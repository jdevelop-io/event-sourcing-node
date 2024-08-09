export abstract class ValueObject<T> {
  protected constructor(protected _value: T) {
    const sanitizedValue = this.sanitize(_value)
    this.validate(sanitizedValue)
    this._value = sanitizedValue
  }

  protected abstract sanitize(value: T): T
  protected abstract validate(value: T): void

  public unwrap(): T {
    return this._value
  }
}
