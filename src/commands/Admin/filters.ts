import { ApplicationCommandRegistry, Command, CommandOptions } from "@sapphire/framework";
import { ApplyOptions } from "@sapphire/decorators";
import { SlashCommandBuilder } from "@discordjs/builders";
import type { CommandInteraction } from 'discord.js';
import { MessageEmbed } from 'discord.js';
  @ApplyOptions<CommandOptions>({
    name: "filters",
    description: "This will show the guilds filters for the available filters.",
    chatInputCommand: {
      register: true
    },
  })
  export class UserCommand extends Command {
    public override registerApplicationCommands(
        registry: ApplicationCommandRegistry
      ) {
        const builder = new SlashCommandBuilder()
          .setName(this.name)
          .setDescription(this.description)
    
        registry.registerChatInputCommand(builder);
      }
  public async chatInputRun(interaction: CommandInteraction) {
      const filters = await this.container.db.filters.findFirst({
        where: {
          guildId: interaction.guildId ?? "0"
        },
        select: {
          MessageLinkFilter: true,
          MessageLinkFilterAction: true,
          ScamLinkFilter: true,
          ScamLinkFilterAction: true,
        }
      })

      if(!filters) {
        await this.container.db.filters.create({
          data: {
            guildId: interaction.guildId ?? "0",
            MessageLinkFilter: false,
            MessageLinkFilterAction: "none",
            ScamLinkFilter: false,
            ScamLinkFilterAction: "none"
          }
        })
      }

      const embed = new MessageEmbed()
      .setTitle("Filters")
      .addField("Link Filter:", `Enabled: \`${filters?.MessageLinkFilter == true ? "✅" : "❌"}\` \n Action: \`${filters?.MessageLinkFilterAction}\``)

      return interaction.reply({
        embeds: [embed],
        ephemeral: false
      })
}};
