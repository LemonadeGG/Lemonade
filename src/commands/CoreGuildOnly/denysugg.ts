import { SlashCommandBuilder } from '@discordjs/builders';
import { ApplyOptions } from '@sapphire/decorators';
import { Command, CommandOptionsRunTypeEnum, RegisterBehavior, type ApplicationCommandRegistry } from '@sapphire/framework';
import type { CommandInteraction, TextChannel } from 'discord.js';
import { emojis } from '../../lib/utils';

@ApplyOptions<Command.Options>({
  name: 'deny',
  description: 'This will deny the suggestion.',
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
      .addStringOption((option) =>
        option.setName('message-id').setRequired(true).setDescription('This is the message ID of the suggestion you wish to deny')
      )
      .addStringOption((option) => option.setName('reason').setRequired(true).setDescription('This is the reason you wish to deny the suggestion'));
    registry.registerChatInputCommand(builder);
  }

  public override async chatInputRun(interaction: CommandInteraction) {
    const chan = (await interaction.guild?.channels.fetch('945020796366114866')) as TextChannel;
    const msg = await chan?.messages.fetch(interaction.options.getString('message-id')!);

    if (msg.embeds) {
      try {
        msg.embeds[0].fields[1].value = `${emojis.CancelEmoji} Denied`;
        if (msg.embeds[0].fields[1].value.includes('Denied')) {
          msg.embeds[0].fields.push({
            value: `Denied By: \`${interaction.user.tag}\` \n Reason: ${interaction.options.getString('reason')}`,
            name: 'Notes:',
            inline: false
          });
        }
        return msg.edit({ embeds: [msg.embeds[0]] });
      } catch (err) {
        console.log(err);
      }
    }

    return interaction.reply('The suggestion has been denied!');
  }
}
