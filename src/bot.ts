import { LemonClient } from './lib/LemonadeClient';

const client = new LemonClient();

async function main() {
  client.logger.debug('Attempting To Login...');
  if (!process.env.token) {
    client.logger.fatal('A Valid Token Was Not Provided!');
    process.exit(1);
  }

  try {
    await client.login(process.env.token);
  } catch (err) {
    client.logger.fatal(err);
    client.destroy();
    process.exit(1);
  }

  client.logger.debug('Logged In Successfully, Registered All Events And Commands, And Connected To PostgreSQL & Cache.');
}

void main();
