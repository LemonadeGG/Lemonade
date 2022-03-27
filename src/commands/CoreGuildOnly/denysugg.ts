import { SlashCommandBuilder } from "@discordjs/builders";
import { ApplyOptions } from "@sapphire/decorators";
import { Command, CommandOptionsRunTypeEnum, type ApplicationCommandRegistry } from "@sapphire/framework";
import type { CommandInteraction } from "discord.js";

@ApplyOptions<Command.Options>({
    name: 'denysuggestion',
    description: "This will deny the suggestion.",
    runIn: [CommandOptionsRunTypeEnum.GuildAny],
    chatInputCommand: {
      register: true,
      guildIds: ['945018151513493514']
    },
    preconditions: ['OwnerOnly']
  })
  export class UserCommand extends Command {
      public override registerApplicationCommands(
          registry: ApplicationCommandRegistry
        ) {
          const builder = new SlashCommandBuilder()
          .setName(this.name)
          .setDescription(this.description)
          .addStringOption(option => 
            option.setName("message id")
            .setDescription("This is the message ID of the suggestion you wish to deny"))
          .addStringOption(option =>
            option.setName("reason")
            .setDescription("This is the reason you wish to deny the suggestion"))
              registry.registerChatInputCommand(builder);
        }

        public override async chatInputRun(interaction: CommandInteraction) {
            await interaction.channel?.messages.fetch(interaction.options.getString("message id")!).then(async (message) => {
                await message.edit("no")
            })}}