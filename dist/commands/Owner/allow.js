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
            .setDescription(this.description)
            .addStringOption((option) => option
            .setName("id")
            .setDescription("The guild you want to whitelist.")
            .setRequired(true));
        registry.registerChatInputCommand(builder);
    }
    async chatInputRun(interaction) {
        const string = await interaction.options.getString("id") ?? "0";
        await this.container.db.guilds.create({
            data: {
                guildId: string
            }
        });
        const embed = new discord_js_1.MessageEmbed()
            .setTitle("Operation Successful")
            .setDescription(`The guild with the id: ${string} has been successfully whitelisted.`);
        return interaction.reply({
            ephemeral: false,
            embeds: [embed]
        });
    }
};
UserCommand = tslib_1.__decorate([
    (0, decorators_1.ApplyOptions)({
        name: "whois",
        description: "This will show information about a given user",
        chatInputCommand: {
            register: true
        }
    })
], UserCommand);
exports.UserCommand = UserCommand;
;
//# sourceMappingURL=allow.js.map