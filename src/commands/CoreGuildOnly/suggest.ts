import { SlashCommandBuilder } from '@discordjs/builders';
import { ApplyOptions } from '@sapphire/decorators';
import { Command, CommandOptionsRunTypeEnum, RegisterBehavior, type ApplicationCommandRegistry } from '@sapphire/framework';
import { CommandInteraction, Constants, MessageEmbed } from 'discord.js';
import { emojis } from '../../lib/utils';

@ApplyOptions<Command.Options>({
  name: 'suggest',
  description: 'This will suggest something in our support server uwu!',
  runIn: [CommandOptionsRunTypeEnum.GuildAny],
  chatInputCommand: {
    register: true,
    guildIds: ['945018151513493514'],
    behaviorWhenNotIdentical: RegisterBehavior.Overwrite
  },
  preconditions: ['OwnerOnly']
})
export class UserCommand extends Command {
  public override registerApplicationCommands(registry: ApplicationCommandRegistry) {
    const builder = new SlashCommandBuilder()
      .setName(this.name)
      .setDescription(this.description)
      .addStringOption((option) => option.setName('suggestion').setDescription('This is the suggestion you wish to make').setRequired(true));

    registry.registerChatInputCommand(builder);
  }

  public override async chatInputRun(interaction: CommandInteraction) {
    await interaction.reply('Your suggestion has been sent to the support server!');

    const daub = await interaction.guild?.channels.fetch('945020796366114866');

    if (daub?.isText()) {
      const embed = new MessageEmbed()
        .setTitle('New suggestion!')
        .setDescription(emojis.BlankEmoji + interaction.options.getString('suggestion')!)
        .setThumbnail(interaction.user.avatarURL({ dynamic: true }) ?? interaction.user.defaultAvatarURL)
        .setColor(Constants.Colors.DARK_BUT_NOT_BLACK)
        .addField('Suggested by', interaction.user.tag, true)
        .addField('Suggestion Status:', 'Pending', true);

      void daub.send({
        embeds: [embed]
      });
    }
  }
}
