"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const LemonadeClient_1 = require("./lib/LemonadeClient");
const utilities_1 = require("@sapphire/utilities");
const discord_hybrid_sharding_1 = require("discord-hybrid-sharding");
const framework_1 = require("@sapphire/framework");
const client = new LemonadeClient_1.LemonClient();
framework_1.container.shards = new discord_hybrid_sharding_1.Client(client);
async function main() {
    await client.logger.debug("Attempting To Login...");
    if ((0, utilities_1.isNullOrUndefined)(process.env.token))
        return;
    try {
        await client.login(process.env.token);
    }
    catch (err) {
        client.logger.info(err);
        return client.destroy();
    }
    await client.logger.debug("Logged In Successfully, Registered All Events And Commands, And Connected To PostgreSQL & Cache.");
}
main();
//# sourceMappingURL=bot.js.map