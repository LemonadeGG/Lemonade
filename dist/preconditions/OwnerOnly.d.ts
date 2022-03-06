import { Precondition } from "@sapphire/framework";
import type { CommandInteraction } from "discord.js";
export declare class UserPrecondition extends Precondition {
    chatInputRun(interaction: CommandInteraction): Promise<import("@sapphire/framework").Result<unknown, import("@sapphire/framework").UserError>>;
}
declare module "@sapphire/framework" {
    interface Preconditions {
        OwnerOnly: never;
    }
}
//# sourceMappingURL=OwnerOnly.d.ts.map