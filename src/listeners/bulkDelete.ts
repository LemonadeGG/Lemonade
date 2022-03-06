import { Events, Listener, ListenerOptions } from "@sapphire/framework";
import { Collection, Message } from "discord.js";
//import { captureException } from "@sentry/minimal";
import { ApplyOptions, RequiresGuildContext } from "@sapphire/decorators";
import { Stopwatch } from "@sapphire/stopwatch";
import { RateLimitManager} from "@sapphire/ratelimits"
import { writeFileSync } from "fs";

@ApplyOptions<ListenerOptions>({ event: Events.MessageBulkDelete })
export class MemberAdd extends Listener {
  @RequiresGuildContext()
  public async run(messages: Collection<string, Message>) {
    const file = writeFileSync('testing.txt', messages.map(message => `[${message.author.tag}]: ${message.content}`).join('\n'))

    
  }
    
}
