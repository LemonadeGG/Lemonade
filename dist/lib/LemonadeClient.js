"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LemonClient = void 0;
const tslib_1 = require("tslib");
const client_1 = require("@prisma/client");
const framework_1 = require("@sapphire/framework");
require("@sapphire/plugin-logger/register");
require("@sapphire/plugin-i18next/register");
require("@sapphire/plugin-api/register");
const Cluster = tslib_1.__importStar(require("discord-hybrid-sharding"));
class LemonClient extends framework_1.SapphireClient {
    constructor() {
        super({
            defaultPrefix: ",",
            intents: [
                "GUILDS",
                "GUILD_MEMBERS",
                "GUILD_BANS",
                "GUILD_EMOJIS_AND_STICKERS",
                "GUILD_VOICE_STATES",
                "GUILD_MESSAGES",
                "GUILD_MESSAGE_REACTIONS",
                "DIRECT_MESSAGES",
                "DIRECT_MESSAGE_REACTIONS",
            ],
            logger: {
                level: 20 /* Debug */,
            },
            shards: Cluster.data.SHARD_LIST,
            shardCount: Cluster.data.TOTAL_SHARDS,
            api: {
                auth: {
                    id: process.env.CLIENT_ID ?? "0",
                    secret: process.env.CLIENT_SECRET ?? "0",
                    cookie: "LEMONY_AUTH",
                    redirect: "/dash",
                    scopes: ['identify', 'guilds'],
                    transformers: []
                },
                origin: '*',
                listenOptions: {
                    port: 8080
                }
            }
        });
        Object.defineProperty(this, "fetchLanguage", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: async (context) => {
                if (!context.guild)
                    return;
                const settings = await framework_1.container.db.guilds.findFirst({
                    where: {
                        guildId: context.guild.id,
                    },
                    select: {
                        language: true,
                    },
                });
                return settings?.language ?? "en-US";
            }
        });
    }
    /**
     *
     */
    async login(token) {
        framework_1.container.db = new client_1.PrismaClient();
        return super.login(token);
    }
}
exports.LemonClient = LemonClient;
//# sourceMappingURL=LemonadeClient.js.map