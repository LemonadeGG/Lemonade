"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserCommand = void 0;
const tslib_1 = require("tslib");
const framework_1 = require("@sapphire/framework");
const decorators_1 = require("@sapphire/decorators");
const discord_js_1 = require("discord.js");
let UserCommand = class UserCommand extends framework_1.Command {
    async chatInputRun(interaction) {
        await this.container.db.guilds.create({
            data: {
                guildId: interaction.guildId ?? "0"
            }
        });
        await this.container.db.filters.create({
            data: {
                guildId: interaction.guildId ?? "0",
                MessageLinkFilter: true,
                MessageLinkFilterAction: "none",
                ScamLinkFilter: true,
                ScamLinkFilterAction: "none"
            }
        });
        const embed = new discord_js_1.MessageEmbed()
            .setTitle("Sucessful!")
            .setDescription("I've now created this guild in the Database!");
        return interaction.reply({
            ephemeral: false,
            embeds: [embed]
        });
    }
};
UserCommand = tslib_1.__decorate([
    (0, decorators_1.ApplyOptions)({
        name: "create",
        description: "This will create data in the database incase it isn't already created.",
        chatInputCommand: {
            register: true
        },
    })
], UserCommand);
exports.UserCommand = UserCommand;
;
//# sourceMappingURL=create.js.map