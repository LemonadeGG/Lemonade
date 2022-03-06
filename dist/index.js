"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("./lib/setup/index");
const discord_hybrid_sharding_1 = require("discord-hybrid-sharding");
const manager = new discord_hybrid_sharding_1.Manager('dist/bot.js', {
    token: process.env.token,
    totalShards: 1,
    totalClusters: 1,
});
manager.on('clusterCreate', shard => {
    console.log(`[PRE/SHARD] | Shard ID: ${shard.id} has been started.`);
});
manager.spawn({
    timeout: -1,
});
//# sourceMappingURL=index.js.map