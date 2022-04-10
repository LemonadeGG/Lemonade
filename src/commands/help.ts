import { Command } from '@sapphire/framework';
import { ApplyOptions } from '@sapphire/decorators';
import { MessageEmbed, MessageActionRow, MessageSelectMenu, CommandInteraction } from 'discord.js';

@ApplyOptions<Command.Options>({
  name: 'help',
  description: 'This will fetch help for you!',
  chatInputCommand: {
    register: true
  },
})
export class UserCommand extends Command {
  public override chatInputRun(interaction: CommandInteraction) {
    
    const select = new MessageActionRow().addComponents(
      new MessageSelectMenu()
        .setCustomId('HELP')
        .setPlaceholder('Select Something!')
        .addOptions([
          {
            label: 'Moderation',
            description: 'This is the moderation module.',
            value: 'moderation_module'
          },
          {
            label: 'Filters',
            description: "This is the filters module.",
            value: "filteres_module"
          }
        ])
    );

    const embed = new MessageEmbed().setTitle('Assistance').setDescription('Here, all assistance you need will be provided.');


    interaction.reply({
      embeds: [embed],
      components: [select]
    });
  }
}
