import { Events, Listener, ListenerOptions } from "@sapphire/framework";
import { Collection, Guild, Message } from "discord.js";
//import { captureException } from "@sentry/minimal";
import { ApplyOptions, RequiresGuildContext } from "@sapphire/decorators";
import { Stopwatch } from "@sapphire/stopwatch";
import { RateLimitManager} from "@sapphire/ratelimits"

@ApplyOptions<ListenerOptions>({ event: Events.GuildCreate })
export class MemberAdd extends Listener {
  @RequiresGuildContext()
  public async run(guild: Guild) {
    const guilds = this.container.db.guilds.findFirst({
        where: {
            guildId: guild.id
        }
    })

    if(!guilds) {
        await guild.leave()
    } else return;
  }
    
}
