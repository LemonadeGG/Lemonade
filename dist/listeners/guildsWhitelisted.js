"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MemberAdd = void 0;
const tslib_1 = require("tslib");
const framework_1 = require("@sapphire/framework");
const discord_js_1 = require("discord.js");
//import { captureException } from "@sentry/minimal";
const decorators_1 = require("@sapphire/decorators");
require("@sapphire/stopwatch");
require("@sapphire/ratelimits");
let MemberAdd = class MemberAdd extends framework_1.Listener {
    async run(guild) {
        const guilds = this.container.db.guilds.findFirst({
            where: {
                guildId: guild.id
            }
        });
        if (!guilds) {
            await guild.leave();
        }
        else
            return;
    }
};
tslib_1.__decorate([
    (0, decorators_1.RequiresGuildContext)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [discord_js_1.Guild]),
    tslib_1.__metadata("design:returntype", Promise)
], MemberAdd.prototype, "run", null);
MemberAdd = tslib_1.__decorate([
    (0, decorators_1.ApplyOptions)({ event: framework_1.Events.GuildCreate })
], MemberAdd);
exports.MemberAdd = MemberAdd;
//# sourceMappingURL=guildsWhitelisted.js.map