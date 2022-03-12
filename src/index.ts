import "./lib/setup/index"
import { ShardingManager } from "discord.js"


const manager = new ShardingManager('dist/bot.js', {
  token: process.env.token,
  totalShards: 1,
});

manager.on('shardCreate', shard => {
  console.log(`[PRE/SHARD] | Shard ID: ${shard.id} has been started.`)
})

manager.spawn()