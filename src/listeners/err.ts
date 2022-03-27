import { codeBlock } from "@discordjs/builders";
import { ApplyOptions } from "@sapphire/decorators";
import {
  ChatInputCommandErrorPayload,
  Events,
  Listener,
  ListenerOptions,
} from "@sapphire/framework";
import { MessageEmbed, WebhookClient } from "discord.js";

@ApplyOptions<ListenerOptions>({
  event: Events.ChatInputCommandError,
})
export class UserListener extends Listener {
  async run(error: Error, payload: ChatInputCommandErrorPayload) {

    const webhook = new WebhookClient({url: "https://canary.discord.com/api/webhooks/950602458625896459/rE37oL4UPwU8tBu_GB43cYMEPXcm3R4thLgsRL9gwqY4jmAQRE7rdaKF3LsHw19pfLyY"})

    const embed = new MessageEmbed() 
    .setTitle("Error")
    .setDescription(codeBlock(error.message))
    .addField("Stack", codeBlock(error.stack!))
    .addField("Command:", payload.command.name)
    .addField("Duration:", `${(payload.duration / 1000).toFixed(2)}s`)
    await webhook.send({embeds: [embed]})
    
  }
}