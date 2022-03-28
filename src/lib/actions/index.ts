import type { User, Guild } from 'discord.js';

export function ban(user: User, reason: string, time: number, guild?: Guild) {
  try {
    void guild?.members.ban(user.id, { reason, days: time });
  } catch (err) {
    throw new Error('CANNOT BAN IN THIS GUILD');
  }
}
