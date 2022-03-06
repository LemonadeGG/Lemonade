import { Precondition } from "@sapphire/framework";
import type { CommandInteraction } from "discord.js";

export class UserPrecondition extends Precondition {
  public async chatInputRun(interaction: CommandInteraction) {
      const owners = ['546475331067052032', '415278805683404821']
    return owners.includes(interaction.user.id)
      ? this.ok()
      : this.error({
          message:
            "You cannot use this command! Only owners are allowed to use it.",
        });
  }
}

declare module "@sapphire/framework" {
  interface Preconditions {
    OwnerOnly: never;
  }
}
