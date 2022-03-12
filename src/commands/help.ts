import { Command, CommandOptions } from "@sapphire/framework";
import { ApplyOptions } from "@sapphire/decorators";
import type { CommandInteraction } from 'discord.js';
import { MessageEmbed, MessageActionRow, MessageSelectMenu } from 'discord.js';
  @ApplyOptions<CommandOptions>({
    name: "help",
    description: "This will fetch help for you!",
    chatInputCommand: {
      register: true
    },
  })
  export class UserCommand extends Command {
  public async chatInputRun(interaction: CommandInteraction) {
      const select = new MessageActionRow()
      .addComponents(
          new MessageSelectMenu()
          .setCustomId("HELP")
          .setPlaceholder("Select Something!")
          .addOptions([{
              label: "Moderation",
              description: "This is the moderation module.",
              value: "moderation_module"
          }])
      )

      const embed = new MessageEmbed()
        .setTitle("Assistance")
        .setDescription("Here, all assistance you need will be provided.");

        return interaction.reply({
            embeds: [embed],
            components: [select]
        })
}};
