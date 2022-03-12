import type { Collection, Message } from 'discord.js';
import { Events, Listener } from '@sapphire/framework';
import { ApplyOptions } from '@sapphire/decorators';
import { writeFile } from 'fs/promises';

@ApplyOptions<Listener.Options>({ event: Events.MessageBulkDelete })
export class UserListener extends Listener {
  public run(messages: Collection<string, Message>) {
    return writeFile('testing.txt', messages.map((message) => `[${message.author.tag}]: ${message.content}`).join('\n'));
  }
}
