import { SlashCommandBuilder } from "@discordjs/builders";
import { ApplyOptions } from "@sapphire/decorators";
import { ApplicationCommandRegistry, Command, CommandOptionsRunTypeEnum } from "@sapphire/framework";
import { CommandInteraction, Constants, MessageEmbed } from "discord.js";

@ApplyOptions<Command.Options>({
    name: 'profile',
    description: "This will grab the profile of the user you enter.",
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
            .setDescription("This is the user of whos profile you wish to fetch"))
  
              registry.registerChatInputCommand(builder);
        }
        public override async chatInputRun(interaction: CommandInteraction) {
            const member = await interaction.guild?.members.fetch(interaction.options.getUser("user")?.id!);
            

            const embed = new MessageEmbed()
            .setTitle("Profile of " + member?.displayName)
            .addField("General Information:", `User ID: \`${member?.id}\` \n User Tag: \`${member?.user.tag}\` \n Created At: <t:${Math.round(member?.user.createdTimestamp! / 1000)}:R> \n Joined At: <t:${Math.round(member?.joinedTimestamp! / 1000)}:R>`)
            .setThumbnail(member?.user.displayAvatarURL({dynamic: true, size: 1024 }) ?? member?.user.defaultAvatarURL!)
            .setImage(`https://url.wtf/api/banners/user/${member?.id}`)
            .setColor(Constants.Colors.DARK_BUT_NOT_BLACK)
            .addField("Guild Stats:", `Total Messages: \`${(await interaction.channel!.messages.fetch()).filter(m => m.author.id === member?.id).size}\` \n`)

            if(member?.guild.id === "945018151513493514") {
              embed.addField("Suggestions:", `Approved: \n Denied: \n Pending: \n Deleted: \n Total:`, true)
              embed.addField("Bugs:", `Approved: \n Denied: \n Pending: \n Deleted: \n Total:`, true)
            }

            return interaction.reply({embeds: [embed]})
        }
    }