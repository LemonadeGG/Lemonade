"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserCommand = void 0;
const tslib_1 = require("tslib");
const framework_1 = require("@sapphire/framework");
const decorators_1 = require("@sapphire/decorators");
require("@discordjs/builders");
require("discord.js");
let UserCommand = class UserCommand extends framework_1.Command {
    async chatInputRun(interaction) {
        await Modal;
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
//# sourceMappingURL=test.js.map