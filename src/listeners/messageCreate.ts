import { Events, Listener, ListenerOptions } from "@sapphire/framework";
import { Message } from "discord.js";
//import { captureException } from "@sentry/minimal";
import { ApplyOptions, RequiresGuildContext } from "@sapphire/decorators";
import { TokenRegex, MessageLinkRegex } from "@sapphire/discord-utilities"
import { PhoneNumberRegex, LinkRegex } from "../lib/utils";

@ApplyOptions<ListenerOptions>({ event: Events.MessageCreate })
export class MemberAdd extends Listener {
  @RequiresGuildContext()
  public async run(msg: Message) {
    if(TokenRegex.test(msg.content)) {
        await msg.member?.ban({
            days: 1,
            reason: "[Sent a discord token in chat. Violated filters]"
        })
    }

    if(PhoneNumberRegex.test(msg.content)) {
      await msg.delete();
    }

    if(LinkRegex.test(msg.content)) {
      await msg.delete();
    }
  }
    
}
