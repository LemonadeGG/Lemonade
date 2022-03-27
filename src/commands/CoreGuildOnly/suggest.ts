import { SlashCommandBuilder } from "@discordjs/builders";
import { ApplyOptions } from "@sapphire/decorators";
import { Command, CommandOptionsRunTypeEnum, type ApplicationCommandRegistry } from "@sapphire/framework";
import type { CommandInteraction } from "discord.js";

@ApplyOptions<Command.Options>({
    name: 'suggest',
    description: "This will suggest something in our support server uwu!",
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
            option.setName("suggestion")
            .setDescription("This is the suggestion you wish to make"))
  
              registry.registerChatInputCommand(builder);
        }

        public override async chatInputRun(interaction: CommandInteraction) {
            await interaction.reply("Your suggestion has been sent to the support server!");
        }
    }