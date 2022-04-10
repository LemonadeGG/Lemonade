import type { Message } from 'discord.js';
import type { GuildMessage } from '../types';
import { isNullishOrEmpty } from '@sapphire/utilities';

export function isGuildMessage(message: Message): message is GuildMessage {
  return message.guild !== null;
}

export const PhoneNumberRegex = /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/;

export const IPv4Regex =
  /^(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;

export const IPv6Regex =
  /^(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))$/;

export const LinkRegex = /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/;

export function envParseArray(key: 'OWNERS', defaultValue?: string[]): string[] {
  const value = process.env[key];
  if (isNullishOrEmpty(value)) {
    if (defaultValue === undefined) throw new Error(`[ENV] ${key} - The key must be an array, but is empty or undefined.`);
    return defaultValue;
  }

  return value.split(' ');
}

export const emojis = {
  CancelEmoji: '<:Lemonade_Cancel:952285241148588062>',
  CheckEmoji: '<:Lemonade_Check:952285526621319199>',
  ClearanceEmoji: '<:Lemonade_Clearance:953884898408673330>',
  EditEmoji: '<:Lemonade_Edit:953884845992443904>',
  BlankEmoji: '<:Lemonade_Blank:957466487508041748> '
};

export enum Clearance {
  NormalUser = 1,
  Moderator,
  Administrator,
  WhitelistedAdmin,
  WhitelistedOwner,
  Owner = 5
}

export enum CaseType {
  Warn = 'Warn',
  Mute = 'Mute',
  Kick = 'Kick',
  Ban = 'Ban'
}
