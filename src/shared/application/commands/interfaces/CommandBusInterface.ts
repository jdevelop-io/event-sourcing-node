import { CommandHandlerInterface } from './CommandHandlerInterface'
import { CommandInterface } from './CommandInterface'

export interface CommandBusInterface {
  register(command: CommandInterface, handler: CommandHandlerInterface<CommandInterface>): void
  execute(command: CommandInterface): Promise<unknown>
}
