"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PhoneNumberRegex = exports.isGuildMessage = void 0;
function isGuildMessage(message) {
    return message.guild !== null;
}
exports.isGuildMessage = isGuildMessage;
exports.PhoneNumberRegex = /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/;
//# sourceMappingURL=index.js.map