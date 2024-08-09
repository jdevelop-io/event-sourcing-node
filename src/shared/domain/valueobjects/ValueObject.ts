export abstract class ValueObject<V> {
  protected readonly value: V

  protected constructor(value: V) {
    const sanitizedValue = this.sanitize(value)
    this.validate(sanitizedValue)
    this.value = sanitizedValue
  }

  protected abstract sanitize(value: V): V
  protected abstract validate(value: V): void

  public unwrap(): V {
    return this.value
  }
}
