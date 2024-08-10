import { EventHandlerInterface } from '@/shared'
import { DummyChangedEvent } from '@test:unit'

export class DummyEventHandler implements EventHandlerInterface<DummyChangedEvent> {
  private _hasBeenCalled: boolean = false

  public get hasBeenCalled(): boolean {
    return this._hasBeenCalled
  }

  public async handle(): Promise<void> {
    this._hasBeenCalled = true
  }
}
