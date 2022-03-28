import { Events, Listener } from '@sapphire/framework';
import { ApplyOptions } from '@sapphire/decorators';
import type { Interaction, SelectMenuInteraction } from 'discord.js';
import { MessageEmbed } from 'discord.js';

@ApplyOptions<Listener.Options>({ event: Events.InteractionCreate })
export class UserListener extends Listener {
  public run(interaction: Interaction) {
    if (interaction.isSelectMenu()) {
      interaction as SelectMenuInteraction;

      if (interaction.values.toString() === 'moderation_module') {
        const embed = new MessageEmbed()
          .setTitle('Moderation')
          .addField('Clearance Level:', '`Clearance 2+ (unless specified elsewhere)`', true)
          .addField(
            'Modules:',
            `${this.container.stores
              .get('commands')
              .filter((cmd) => cmd.category === 'Admin')
              .map((cmd) => `${cmd.name} - ${cmd.description}`)
              .join('\n')}`,
            true
          )
          .addField(
            'Description: ',
            'This module is the easiest way  to moderate someone, with full on customization. This includes days, reasons, etc...'
          );
        void interaction.reply({
          embeds: [embed]
        });
      }
    }
  }
}
