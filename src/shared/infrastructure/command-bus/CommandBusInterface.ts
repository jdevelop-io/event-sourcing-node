import { CommandHandlerInterface, CommandInterface } from '@/shared'

export interface CommandBusInterface {
  register(command: CommandInterface, handler: CommandHandlerInterface<CommandInterface>): void
  execute(command: CommandInterface): Promise<unknown>
}
