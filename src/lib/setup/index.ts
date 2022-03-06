import { config } from "dotenv-cra"
process.env.NODE_ENV ??= "development";

import "reflect-metadata";
import "@sapphire/plugin-logger/register";
import * as colorette from "colorette";
import { inspect } from "util";

// 
config();

// Set default inspection depth
inspect.defaultOptions.depth = 1;

// Enable colorette
colorette.createColors({ useColor: true });