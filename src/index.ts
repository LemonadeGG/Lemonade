import "./lib/setup/index"
import { Manager } from "discord-hybrid-sharding"


const manager = new Manager('dist/bot.js', {
  token: process.env.token,
  totalShards: 1,
  totalClusters: 1,
});

manager.on('clusterCreate', shard => {
  console.log(`[PRE/SHARD] | Shard ID: ${shard.id} has been started.`)
})

manager.spawn({
  timeout: -1,
})