import { Precondition } from '@sapphire/framework';
import type { CommandInteraction } from 'discord.js';
import { Clearance } from '../lib/utils';

export class UserPrecondition extends Precondition {
  public async chatInputCommand(interaction: CommandInteraction, _command: never, clearance: Clearance) {
    if (clearance === Clearance.Moderator) {
      if (interaction.inCachedGuild()) {
        const clear = await this.container.db.clearance.findFirst({
          where: {
            guildId: interaction.guild!.id
          },
          select: {
            Clearance2: true
          }
        });

        interaction.guild.roles.cache.some((role) => clear?.Clearance2.includes(role.id));
      }
    }
  }
}
