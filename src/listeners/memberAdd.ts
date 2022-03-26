import { Events, Listener } from '@sapphire/framework';
import type { GuildMember } from 'discord.js';
import { ApplyOptions } from '@sapphire/decorators';


@ApplyOptions<Listener.Options>({ event: Events.GuildMemberAdd })
export class UserListener extends Listener {
  
  public async run(member: GuildMember) {


    const res = await this.checkUser(member)

    if(res) {
      member.ban({reason: "[ Breached Filter - User Suspicion"})
    }
    
  }
  private async checkUser(member: GuildMember) {
    const filters = await this.container.db.filters.findFirst({
      where: {
        guildId: member.guild.id
      },
      select: {
        UserSuspicionAction: true,
        UserSuspicionFlags: true,
      }
    })
    if(member.user.createdAt < new Date()) {
      if(filters?.UserSuspicionFlags.includes("createdFlag")) {
        return true;
      } else return null;
  }

  return false;
}
}
