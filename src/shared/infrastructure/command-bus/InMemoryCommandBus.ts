import { CommandBusInterface, CommandHandlerInterface, CommandInterface } from '@/shared'

export class InMemoryCommandBus implements CommandBusInterface {
  private handlers: Map<string, CommandHandlerInterface<CommandInterface>> = new Map()

  public register(command: CommandInterface, handler: CommandHandlerInterface<CommandInterface>): void {
    this.handlers.set(command.name, handler)
  }

  public async execute(command: CommandInterface): Promise<unknown> {
    const handler = this.handlers.get(command.name)

    if (!handler) {
      throw new Error(`Command handler for ${command.name} not found`)
    }

    return handler.handle(command)
  }
}
