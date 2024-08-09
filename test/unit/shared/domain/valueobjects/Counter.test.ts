import { Counter } from '@/shared'

describe('Counter', () => {
  let counter: Counter

  beforeEach(() => {
    counter = Counter.of(0)
  })

  it('should have a positive value', () => {
    expect(() => {
      Counter.of(-1)
    }).toThrow(RangeError)
  })

  it('should have an initial value', () => {
    expect(counter.unwrap()).toBe(0)
  })

  it('should increment the value', () => {
    counter = counter.increment()
    expect(counter.unwrap()).toBe(1)
  })

  it('should not decrement the value if the value is 0', () => {
    counter = counter.decrement()
    expect(counter.unwrap()).toBe(0)
  })

  it('should decrement the value', () => {
    counter = counter.increment().increment().decrement()
    expect(counter.unwrap()).toBe(1)
  })
})
