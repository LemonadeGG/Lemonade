import { Events, Listener, ListenerOptions } from "@sapphire/framework";
//import { captureException } from "@sentry/minimal";
import { ApplyOptions, RequiresGuildContext } from "@sapphire/decorators";

@ApplyOptions<ListenerOptions>({ event: Events.ClientReady })
export class MemberAdd extends Listener {
  @RequiresGuildContext()
  public async run() {
      console.log(this.container.client.shard?.ids)
  }
    
}
