"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorRoute = void 0;
const tslib_1 = require("tslib");
const decorators_1 = require("@sapphire/decorators");
const plugin_api_1 = require("@sapphire/plugin-api");
let ErrorRoute = class ErrorRoute extends plugin_api_1.Route {
    async [plugin_api_1.methods.POST](req, res) {
        console.log(req.params);
    }
};
ErrorRoute = tslib_1.__decorate([
    (0, decorators_1.ApplyOptions)({
        route: '/error/:id',
    })
], ErrorRoute);
exports.ErrorRoute = ErrorRoute;
//# sourceMappingURL=errors.js.map