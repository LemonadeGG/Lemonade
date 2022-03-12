import { Events, Listener } from '@sapphire/framework';
import type { GuildMember } from 'discord.js';
import { ApplyOptions } from '@sapphire/decorators';
import { RateLimitManager } from '@sapphire/ratelimits';

const rateLimitManager = new RateLimitManager(6000, 1);
const arr: Array<string> = [];

@ApplyOptions<Listener.Options>({ event: Events.GuildMemberAdd })
export class UserListener extends Listener {
  public run(member: GuildMember) {
    arr.push(member.id);
    const rateLimit = rateLimitManager.acquire(member.guild.id);

    if (rateLimit.limited) {
      return console.log(arr);
    }

    // Up the counter
    rateLimit.consume();
  }
}
