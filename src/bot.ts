import { LemonClient } from "./lib/LemonadeClient";
import { isNullOrUndefined } from "@sapphire/utilities";
const client = new LemonClient();
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
