import { Command, CommandOptionsRunTypeEnum } from '@sapphire/framework';
import { ApplyOptions } from '@sapphire/decorators';
import { MessageEmbed, CommandInteraction } from 'discord.js';

@ApplyOptions<Command.Options>({
  name: 'create',
  description: "This will create data in the database incase it isn't already created.",
  runIn: [CommandOptionsRunTypeEnum.GuildAny],
  chatInputCommand: {
    register: true
  }
})
export class UserCommand extends Command {
  public override async chatInputRun(interaction: CommandInteraction) {
    await this.container.db.guilds.create({
      data: {
        guildId: interaction.guildId!
      }
    });

    await this.container.db.filters.create({
      data: {
        guildId: interaction.guildId!,
        MessageLinkFilter: true,
        MessageLinkFilterAction: 'none',
        ScamLinkFilter: true,
        ScamLinkFilterAction: 'none'
      }
    });

    const embed = new MessageEmbed().setTitle('Successful!').setDescription("I've now created this guild in the Database!");

    return interaction.reply({
      embeds: [embed]
    });
  }
}
