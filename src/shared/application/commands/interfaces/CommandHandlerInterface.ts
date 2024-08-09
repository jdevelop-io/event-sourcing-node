import { AggregateId } from '@/shared'
import { CommandInterface } from './CommandInterface.ts'

export interface CommandHandlerInterface<Command extends CommandInterface> {
  handle(command: Command): Promise<AggregateId<unknown>>
}
