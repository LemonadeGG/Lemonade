import { ApplicationCommandRegistry, Command } from "@sapphire/framework";
import type { CommandInteraction } from 'discord.js';
export declare class UserCommand extends Command {
    registerApplicationCommands(registry: ApplicationCommandRegistry): void;
    chatInputRun(interaction: CommandInteraction): Promise<void>;
}
//# sourceMappingURL=allow.d.ts.map