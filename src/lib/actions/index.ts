import type { User, Guild } from "discord.js";


export async function ban(user: User, reason: string, time: number, guild?: Guild) {
    try {
        guild?.members.ban(user.id, {reason: reason, days: time,})
    } catch (err) {
        throw new Error("CANNOT BAN IN THIS GUILD")
    }
    
}
