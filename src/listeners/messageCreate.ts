import { Listener } from '@sapphire/framework';
import { Message } from 'discord.js';
import { RequiresGuildContext } from '@sapphire/decorators';
import { TokenRegex } from '@sapphire/discord-utilities';
import { PhoneNumberRegex, LinkRegex } from '../lib/utils';

export class UserListener extends Listener {
  @RequiresGuildContext()
  public async run(msg: Message) {
    if (TokenRegex.test(msg.content)) {
      await msg.member!.ban({
        days: 1,
        reason: '[Sent a discord token in chat. Violated filters]'
      });
    } else if (PhoneNumberRegex.test(msg.content) || LinkRegex.test(msg.content)) {
      await msg.delete();
    }
  }
}
