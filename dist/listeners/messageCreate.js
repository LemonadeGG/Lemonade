"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MemberAdd = void 0;
const tslib_1 = require("tslib");
const framework_1 = require("@sapphire/framework");
const discord_js_1 = require("discord.js");
//import { captureException } from "@sentry/minimal";
const decorators_1 = require("@sapphire/decorators");
const discord_utilities_1 = require("@sapphire/discord-utilities");
let MemberAdd = class MemberAdd extends framework_1.Listener {
    async run(msg) {
        console.log(discord_utilities_1.TokenRegex.test(msg.content));
        if (discord_utilities_1.TokenRegex.test(msg.content)) {
            await msg.member?.ban({
                days: 1,
                reason: "[Sent a discord token in chat. Violated filters]"
            });
        }
    }
};
tslib_1.__decorate([
    (0, decorators_1.RequiresGuildContext)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [discord_js_1.Message]),
    tslib_1.__metadata("design:returntype", Promise)
], MemberAdd.prototype, "run", null);
MemberAdd = tslib_1.__decorate([
    (0, decorators_1.ApplyOptions)({ event: framework_1.Events.MessageCreate })
], MemberAdd);
exports.MemberAdd = MemberAdd;
//# sourceMappingURL=messageCreate.js.map