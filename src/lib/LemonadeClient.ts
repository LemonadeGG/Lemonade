import { PrismaClient } from '@prisma/client';
import { SapphireClient, container } from '@sapphire/framework';
import type { InternationalizationContext } from '@sapphire/plugin-i18next';

export class LemonClient extends SapphireClient {
  public constructor() {
    super({
      intents: ['GUILDS', 'GUILD_MESSAGES', 'DIRECT_MESSAGES'],
      api: {
        auth: {
                id: process.env.CLIENT_ID!,
                secret: process.env.CLIENT_SECRET!,
                cookie: 'LEMONY_AUTH',
                redirect: '/dash',
                scopes: ['identify', 'guilds'],
              },
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
