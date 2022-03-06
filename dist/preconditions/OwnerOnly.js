"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserPrecondition = void 0;
const framework_1 = require("@sapphire/framework");
class UserPrecondition extends framework_1.Precondition {
    async chatInputRun(interaction) {
        const owners = ['546475331067052032', '415278805683404821'];
        return owners.includes(interaction.user.id)
            ? this.ok()
            : this.error({
                message: "You cannot use this command! Only owners are allowed to use it.",
            });
    }
}
exports.UserPrecondition = UserPrecondition;
//# sourceMappingURL=OwnerOnly.js.map