import { ApplicationCommandRegistry, Command, CommandOptionsRunTypeEnum } from '@sapphire/framework';
import { ApplyOptions } from '@sapphire/decorators';
import { MessageEmbed, MessageActionRow, CommandInteraction, MessageButton } from 'discord.js';
import { SlashCommandBuilder } from '@discordjs/builders';
import { CheckEmoji, CancelEmoji } from '../../lib/utils';
import { ban } from '../../lib/actions';
// import ms from "ms"

@ApplyOptions<Command.Options>({
  name: 'ban',
  description: 'Ban a user in the most customizable way!',
  chatInputCommand: {
    register: true
  },
  runIn: [CommandOptionsRunTypeEnum.GuildAny],
})
export class UserCommand extends Command {
    public override registerApplicationCommands(
        registry: ApplicationCommandRegistry
      ) {
        const builder = new SlashCommandBuilder()
          .setName(this.name)
          .setDescription(this.name)
          .addUserOption(option => 
            option.setName("member")
            .setDescription("User you wish to ban")
            .setRequired(true)
            )
            .addStringOption(option => 
                option.setName("reason")
                .setDescription("Reason why you want to ban this user.")
                )
            .addBooleanOption(option => 
                option.setName("dm")
                .setDescription("Do you wish to DM the user?")
                )
                .addStringOption(option => 
                    option.setName("time")
                    .setDescription("This amount of time you want this user to be banned for."))
    
        registry.registerChatInputCommand(builder);
      }
      public override async chatInputRun(interaction: CommandInteraction) {

        this.create
          
          const reason = interaction.options.getString("reason") ?? "No Reason Provided."
          const user = interaction.options.getUser("member")
          const dm = interaction.options.getBoolean("dm")
          const time = interaction.options.getString("time") ?? "14d"
          const time2 = parseInt(time)
          let disabled = false;

    const buttons = new MessageActionRow().addComponents(
      new MessageButton()
        .setCustomId('CMD_BAN_CONFIRMATION')
        .setStyle('PRIMARY')
        .setLabel("Proceed")
        .setDisabled(disabled),
        new MessageButton()
        .setCustomId("CMD_BAN_CANCEL")
        .setStyle("DANGER")
        .setLabel("Cancel")
        .setDisabled(disabled)
    )

    const embed = new MessageEmbed().setTitle('Confirmation').setDescription(`Do you wish to ban the user ${user!.tag}?`);
    let emoji;
    const banned = new MessageEmbed()
    .setTitle(`You have been banned from: ${interaction.guild?.name}`)
    .addField("Here are the details:", `Moderator: \`${interaction.user.tag}\` \n Reason: \`${reason}\` \n Time \`${time}\``)

    interaction.reply({
      embeds: [embed],
      components: [buttons]
    });

    const collector = await interaction.channel?.createMessageComponentCollector({
        time: 10000,
        componentType: "BUTTON"
    })

    collector?.on("collect", async (res) => {
        if(res.customId == "CMD_BAN_CONFIRMATION") {
            if(dm){
                try {
                    user?.send({
                        embeds: [banned]
                    })
                    emoji = CheckEmoji
                } catch (err) {
                    emoji = CancelEmoji
                }
            }
            ban(user!, reason, time2, interaction.guild!)
            
        }

        if(res.customId == "CMD_BAN_CANCEL") {
            disabled = true
            interaction.deleteReply()
            interaction.channel?.send({
                content: "Cancelled.",
                components: [buttons]
            })
        }
    })

    collector?.on('end', async () => {
        disabled = true
        interaction.deleteReply()
        interaction.reply({
            content: "Cancelled."
        })
    })    
    
  }
}