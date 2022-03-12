import { Listener } from '@sapphire/framework';

export class MemberAdd extends Listener {
  public run() {
    console.log(this.container.client.shard?.ids);
  }
}
