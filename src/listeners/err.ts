import { Events, Listener } from '@sapphire/framework';
import { ApplyOptions } from '@sapphire/decorators';

@ApplyOptions<Listener.Options>({ event: Events.ChatInputCommandError })
export class UserListener extends Listener {
  public run(error: Error) {
    console.log(error)
  }
}
