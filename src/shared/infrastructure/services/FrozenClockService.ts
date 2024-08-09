import { ClockServiceInterface } from '@/shared'

export class FrozenClockService implements ClockServiceInterface {
  public constructor(private readonly _date: Date) {}

  public now(): Date {
    return this._date
  }
}
