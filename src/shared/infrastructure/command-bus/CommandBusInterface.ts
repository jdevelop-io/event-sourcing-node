import { CommandHandlerInterface } from '../../application/commands/interfaces/CommandHandlerInterface.ts'
import { CommandInterface } from '../../application/commands/interfaces/CommandInterface.ts'

export interface CommandBusInterface {
  register(command: CommandInterface, handler: CommandHandlerInterface<CommandInterface>): void
  execute(command: CommandInterface): Promise<unknown>
}
