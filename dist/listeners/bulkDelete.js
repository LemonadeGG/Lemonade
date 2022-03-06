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
const fs_1 = require("fs");
let MemberAdd = class MemberAdd extends framework_1.Listener {
    async run(messages) {
        (0, fs_1.writeFileSync)('testing.txt', messages.map(message => `[${message.author.tag}]: ${message.content}`).join('\n'));
    }
};
tslib_1.__decorate([
    (0, decorators_1.RequiresGuildContext)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [discord_js_1.Collection]),
    tslib_1.__metadata("design:returntype", Promise)
], MemberAdd.prototype, "run", null);
MemberAdd = tslib_1.__decorate([
    (0, decorators_1.ApplyOptions)({ event: framework_1.Events.MessageBulkDelete })
], MemberAdd);
exports.MemberAdd = MemberAdd;
//# sourceMappingURL=bulkDelete.js.map