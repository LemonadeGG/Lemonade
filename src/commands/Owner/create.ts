import {  Command, CommandOptions } from "@sapphire/framework";
import { ApplyOptions } from "@sapphire/decorators";
import type{ CommandInteraction } from 'discord.js';
import { MessageEmbed } from 'discord.js';
  @ApplyOptions<CommandOptions>({
    name: "create",
    description: "This will create data in the database incase it isn't already created.",
    chatInputCommand: {
      register: true
    },
  })
  export class UserCommand extends Command {
    
  public async chatInputRun(interaction: CommandInteraction) {
      await this.container.db.guilds.create({
          data: {
              guildId: interaction.guildId ?? "0"
          }
      })

      await this.container.db.filters.create({
          data: {
              guildId: interaction.guildId ?? "0",
              MessageLinkFilter: true,
              MessageLinkFilterAction: "none",
              ScamLinkFilter: true,
              ScamLinkFilterAction: "none"
          }
      })

      const embed = new MessageEmbed()
      .setTitle("Sucessful!")
      .setDescription("I've now created this guild in the Database!")

      return interaction.reply({
          ephemeral: false,
          embeds: [embed]
      })
}};
