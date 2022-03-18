import type { GuildTextBasedChannelTypes } from '@sapphire/discord.js-utilities';
import type { Guild, GuildMember, Message } from 'discord.js';
import type { PrismaClient } from '@prisma/client';

declare module '@sapphire/pieces' {
  interface Container {
    db: PrismaClient;
  }
}

export interface GuildMessage extends Message {
  channel: GuildTextBasedChannelTypes;
  readonly guild: Guild;
  readonly member: GuildMember;
}