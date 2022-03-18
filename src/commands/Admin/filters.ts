import { Command, CommandOptionsRunTypeEnum } from '@sapphire/framework';
import { ApplyOptions } from '@sapphire/decorators';
import { MessageEmbed, CommandInteraction } from 'discord.js';

@ApplyOptions<Command.Options>({
  name: 'filters',
  description: 'This will show the guilds filters for the available filters.',
  runIn: [CommandOptionsRunTypeEnum.GuildAny],
  chatInputCommand: {
    register: true
  }
})
export class UserCommand extends Command {
  public override async chatInputRun(interaction: CommandInteraction) {
    const filters = await this.container.db.filters.findFirst({
      where: {
        guildId: interaction.guildId!
      },
      select: {
        MessageLinkFilter: true,
        MessageLinkFilterAction: true,
        ScamLinkFilter: true,
        ScamLinkFilterAction: true
      }
    });

    if (!filters) {
      await this.container.db.filters.create({
        data: {
          guildId: interaction.guildId!,
          MessageLinkFilter: false,
          MessageLinkFilterAction: 'none',
          ScamLinkFilter: false,
          ScamLinkFilterAction: 'none'
        }
      });
    }

    const embed = new MessageEmbed()
      .setTitle('Filters')
      .addField(
        'Link Filter:',
        `Enabled: \`${filters?.MessageLinkFilter ? '✅' : '❌'}\` \n Action: \`${filters?.MessageLinkFilterAction ?? 'none'}\``
      );

    return interaction.reply({
      embeds: [embed],
      ephemeral: false
    });
  }
}
