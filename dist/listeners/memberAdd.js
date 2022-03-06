"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MemberAdd = void 0;
const tslib_1 = require("tslib");
const framework_1 = require("@sapphire/framework");
const decorators_1 = require("@sapphire/decorators");
const ratelimits_1 = require("@sapphire/ratelimits");
const rateLimitManager = new ratelimits_1.RateLimitManager(3000, 2);
const arr = [];
let MemberAdd = class MemberAdd extends framework_1.Listener {
    async run(member) {
        arr.push(member.id);
        const rateLimit = rateLimitManager.acquire(member.guild.id);
        if (rateLimit.limited) {
            arr.forEach(async (m) => {
                console.log(m);
            });
        }
    }
};
MemberAdd = tslib_1.__decorate([
    (0, decorators_1.ApplyOptions)({ event: framework_1.Events.GuildMemberAdd })
], MemberAdd);
exports.MemberAdd = MemberAdd;
//# sourceMappingURL=memberAdd.js.map