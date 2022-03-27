import { SlashCommandBuilder } from "@discordjs/builders";
import { ApplyOptions } from "@sapphire/decorators";
import { ApplicationCommandRegistry, Command, CommandOptionsRunTypeEnum } from "@sapphire/framework";
import { CommandInteraction, MessageEmbed } from "discord.js";

@ApplyOptions<Command.Options>({
    name: 'avatar',
    description: "This will grab the avatar of the user you mention",
    runIn: [CommandOptionsRunTypeEnum.GuildAny],
    chatInputCommand: {
      register: true,
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
          .addUserOption(option =>
            option.setName("user")
            .setDescription("This is the user of whos avatar you wish to fetch"))
  
              registry.registerChatInputCommand(builder);
        }
        public override async chatInputRun(interaction: CommandInteraction) {
            const user = interaction.options.getUser("user");


            const embed = new MessageEmbed()
            .setDescription(`User ID: \`${user?.id}\` \n User Tag: \`${user?.tag}\``)
            .setImage(user?.displayAvatarURL({dynamic: true, size: 1024 })!);

            return interaction.reply({embeds: [embed]})
        }
    }