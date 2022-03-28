import { Precondition } from '@sapphire/framework';
import type { CommandInteraction } from 'discord.js';
import { envParseArray } from '../lib/utils';

const OWNERS = envParseArray('OWNERS');

export class UserPrecondition extends Precondition {
  public override async chatInputRun(interaction: CommandInteraction) {
    return OWNERS.includes(interaction.user.id) ? this.ok() : this.error({ message: 'This command can only be used by the owner.' });
  }
}

declare module '@sapphire/framework' {
  interface Preconditions {
    OwnerOnly: never;
  }
}
