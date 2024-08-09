import { CommandHandlerInterface } from '@/shared/application/commands/interfaces/CommandHandlerInterface.ts'
import { CommandInterface } from '@/shared/application/commands/interfaces/CommandInterface.ts'

export interface CommandBusInterface {
  register(command: CommandInterface, handler: CommandHandlerInterface<CommandInterface>): void
  execute(command: CommandInterface): Promise<unknown>
}
