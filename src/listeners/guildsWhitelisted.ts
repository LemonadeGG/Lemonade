import { Events, Listener } from '@sapphire/framework';
import type { Guild } from 'discord.js';
import { ApplyOptions } from '@sapphire/decorators';

@ApplyOptions<Listener.Options>({ event: Events.GuildCreate })
export class MemberAdd extends Listener {
  public async run(guild: Guild) {
    const guilds = this.container.db.guilds.findFirst({
      where: {
        guildId: guild.id
      }
    });

    if (!guilds) {
      await guild.leave();
    }
  }
}
