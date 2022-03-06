import type { Message } from "discord.js";
import type { GuildMessage } from "../types";

export function isGuildMessage(message: Message): message is GuildMessage {
    return message.guild !== null
  }

export const PhoneNumberRegex = /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/