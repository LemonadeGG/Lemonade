import { LemonClient } from "./lib/LemonadeClient";
import { isNullOrUndefined } from "@sapphire/utilities";
import { Client } from "discord-hybrid-sharding";
import { container } from "@sapphire/framework";

const client = new LemonClient();
container.shards = new Client(client);
async function main() {
  await client.logger.debug("Attempting To Login...");
  if (isNullOrUndefined(process.env.token)) return;
  try {
    await client.login(process.env.token);
  } catch (err) {
    client.logger.info(err);
    return client.destroy();
  }
  await client.logger.debug(
    "Logged In Successfully, Registered All Events And Commands, And Connected To PostgreSQL & Cache."
  );
}
main();
