import { PrismaClient } from '@prisma/client';
import { LogLevel, SapphireClient, container } from '@sapphire/framework';
import type { InternationalizationContext } from '@sapphire/plugin-i18next';

export class LemonClient extends SapphireClient {
  public constructor() {
    super({
      defaultPrefix: ',',
      intents: [
        'GUILDS',
        'GUILD_MEMBERS',
        'GUILD_BANS',
        'GUILD_EMOJIS_AND_STICKERS',
        'GUILD_VOICE_STATES',
        'GUILD_MESSAGES',
        'GUILD_MESSAGE_REACTIONS',
        'DIRECT_MESSAGES',
        'DIRECT_MESSAGE_REACTIONS'
      ],
      logger: {
        level: LogLevel.Debug
      },
      shards: container.client.shard?.ids,
      shardCount: container.client.shard?.count,
      api: {
        auth: {
          id: process.env.CLIENT_ID ?? '0',
          secret: process.env.CLIENT_SECRET ?? '0',
          cookie: 'LEMONY_AUTH',
          redirect: '/dash',
          scopes: ['identify', 'guilds'],
          transformers: []
        },
        origin: '*',
        listenOptions: {
          port: 8080
        }
      }
    });
  }

  public override login(token: string) {
    container.db = new PrismaClient();
    return super.login(token);
  }

  public fetchLanguage = async (context: InternationalizationContext) => {
    if (!context.guild) return 'en-US';

    const settings = await container.db.guilds.findFirst({
      where: {
        guildId: context.guild.id
      },
      select: {
        language: true
      }
    });

    return settings?.language ?? 'en-US';
  };
}
