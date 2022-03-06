"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserCommand = void 0;
const tslib_1 = require("tslib");
const framework_1 = require("@sapphire/framework");
const decorators_1 = require("@sapphire/decorators");
const builders_1 = require("@discordjs/builders");
const discord_js_1 = require("discord.js");
let UserCommand = class UserCommand extends framework_1.Command {
    registerApplicationCommands(registry) {
        const builder = new builders_1.SlashCommandBuilder()
            .setName(this.name)
            .setDescription(this.description);
        registry.registerChatInputCommand(builder);
    }
    async chatInputRun(interaction) {
        const filters = await this.container.db.filters.findFirst({
            where: {
                guildId: interaction.guildId ?? "0"
            },
            select: {
                MessageLinkFilter: true,
                MessageLinkFilterAction: true,
                ScamLinkFilter: true,
                ScamLinkFilterAction: true,
            }
        });
        if (!filters) {
            await this.container.db.filters.create({
                data: {
                    guildId: interaction.guildId ?? "0",
                    MessageLinkFilter: false,
                    MessageLinkFilterAction: "none",
                    ScamLinkFilter: false,
                    ScamLinkFilterAction: "none"
                }
            });
        }
        const embed = new discord_js_1.MessageEmbed()
            .setTitle("Filters")
            .addField("Link Filter:", `Enabled: \`${filters?.MessageLinkFilter == true ? "✅" : "❌"}\` \n Action: \`${filters?.MessageLinkFilterAction}\``);
        return interaction.reply({
            embeds: [embed],
            ephemeral: false
        });
    }
};
UserCommand = tslib_1.__decorate([
    (0, decorators_1.ApplyOptions)({
        name: "filters",
        description: "This will show the guilds filters for the available filters.",
        chatInputCommand: {
            register: true
        },
    })
], UserCommand);
exports.UserCommand = UserCommand;
;
//# sourceMappingURL=filters.js.map