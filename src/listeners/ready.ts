import { Events, Listener, ListenerOptions } from "@sapphire/framework";
//import { captureException } from "@sentry/minimal";
import { ApplyOptions, RequiresGuildContext } from "@sapphire/decorators";
import { Client } from "discord.js";

@ApplyOptions<ListenerOptions>({ event: Events.ClientReady })
export class MemberAdd extends Listener {
  @RequiresGuildContext()
  public async run(client: Client) {
      console.log(":catyes:")
  }
    
}
