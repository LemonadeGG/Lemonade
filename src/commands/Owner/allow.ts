import { ApplicationCommandRegistry, Command, CommandOptions } from "@sapphire/framework";
import { ApplyOptions } from "@sapphire/decorators";
import { SlashCommandBuilder } from "@discordjs/builders";
import type { CommandInteraction } from 'discord.js';
import { MessageEmbed } from 'discord.js';
  @ApplyOptions<CommandOptions>({
    name: "whois",
    description: "This will show information about a given user",
    chatInputCommand: {
      register: true
    }
  })
  export class UserCommand extends Command {
    public override registerApplicationCommands(
        registry: ApplicationCommandRegistry
      ) {
        const builder = new SlashCommandBuilder()
          .setName(this.name)
          .setDescription(this.description)
          .addStringOption((option) =>
            option
              .setName("id")
              .setDescription("The guild you want to whitelist.")
              .setRequired(true)
          );
    
        registry.registerChatInputCommand(builder);
      }
  public async chatInputRun(interaction: CommandInteraction) {
      const string = await interaction.options.getString("id") ?? "0"

      await this.container.db.guilds.create({
          data: {
              guildId: string
          }
      })

      const embed = new MessageEmbed()
      .setTitle("Operation Successful")
      .setDescription(`The guild with the id: ${string} has been successfully whitelisted.`)

      return interaction.reply({
          ephemeral: false,
          embeds: [embed]
      })
}};
