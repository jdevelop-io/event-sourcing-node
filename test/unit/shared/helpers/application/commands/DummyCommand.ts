import { CommandHandlerInterface, CommandInterface } from '@/shared'
import { DummyAggregateId } from '@test:unit'

export class DummyCommand implements CommandInterface {
  public readonly name = DummyCommand.name
}

export class DummyCommandHandler implements CommandHandlerInterface<DummyCommand> {
  public async handle(): Promise<DummyAggregateId> {
    return DummyAggregateId.of('42')
  }
}
