import { Events, Listener, ListenerOptions } from "@sapphire/framework";
import type { GuildMember } from "discord.js";
import { ApplyOptions } from "@sapphire/decorators";
import { RateLimitManager } from "@sapphire/ratelimits";

const rateLimitManager = new RateLimitManager(6000, 1);
const arr: Array<string> = [];

@ApplyOptions<ListenerOptions>({ event: Events.GuildMemberAdd })
export class MemberAdd extends Listener {
    public async run(member: GuildMember) {
        arr.push(member.id)
        const rateLimit = rateLimitManager.acquire(member.guild.id);
        
  if (rateLimit.limited) {
     arr.forEach(async (m) => {
         console.log(m);
     })
  }

  // Up the counter
  rateLimit.consume();
    }
}