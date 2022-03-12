import { config } from 'dotenv-cra';
process.env.NODE_ENV ??= 'development';

import '@sapphire/plugin-logger/register';
import '@sapphire/plugin-i18next/register';
import '@sapphire/plugin-api/register';

import colorette from 'colorette';

//
config();

// Enable colorette
colorette.createColors({ useColor: true });
