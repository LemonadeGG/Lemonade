import type { PrismaClient } from '@prisma/client'
import type { Client } from 'discord-hybrid-sharding'

declare module '@sapphire/pieces' {
  interface Container {
    db: PrismaClient
  }
}

declare module '@sapphire/pieces' {
  interface Container {
    shards: Client
  }
}

/**
 * The OAuth2 body data sent to the callback.
 * @since 1.2.0
 */
 export interface OAuth2BodyData {
	/**
	 * The code sent by the client.
	 * @since 1.2.0
	 */
	code: string;

	/**
	 * The client's ID.
	 * @since 1.2.0
	 */
	clientId: string;

	/**
	 * The redirect URI.
	 * @since 1.2.0
	 */
	redirectUri: string;
 }