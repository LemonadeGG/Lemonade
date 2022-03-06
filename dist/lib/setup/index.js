"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const dotenv_cra_1 = require("dotenv-cra");
(_a = process.env).NODE_ENV ?? (_a.NODE_ENV = "development");
require("reflect-metadata");
require("@sapphire/plugin-logger/register");
const colorette = tslib_1.__importStar(require("colorette"));
const util_1 = require("util");
// 
(0, dotenv_cra_1.config)();
// Set default inspection depth
util_1.inspect.defaultOptions.depth = 1;
// Enable colorette
colorette.createColors({ useColor: true });
//# sourceMappingURL=index.js.map