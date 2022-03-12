import { Listener } from '@sapphire/framework';

export class UserListener extends Listener {
  public run() {
    console.log(this.container.client.shard?.ids);
  }
}
