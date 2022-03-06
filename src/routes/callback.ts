import { ApplyOptions } from "@sapphire/decorators";
import type { PieceContext } from "@sapphire/framework";
import { RouteOptions, Route, methods, ApiRequest, ApiResponse, HttpCodes } from "@sapphire/plugin-api"
import { RESTPostOAuth2AccessTokenResult, RESTPostOAuth2AccessTokenURLEncodedData, OAuth2Routes } from 'discord-api-types/v10';
import { stringify } from "querystring";
import type { OAuth2BodyData } from "../lib/interfaces/index"
import { fetch, FetchMethods  } from "@sapphire/fetch";
  
export class PluginRoute extends Route {
	private readonly redirectUri: string | undefined;

	public constructor(context: PieceContext) {
		super(context, { route: 'oauth/callback' });

		const { server } = this.container;
		this.enabled = server.auth !== null;
		this.redirectUri = server.auth?.redirect;
	}

	public async [methods.GET](request: ApiRequest, response: ApiResponse) {
		const body = request.body as OAuth2BodyData;
		if (typeof body?.code !== 'string') {
			return response.badRequest();
		}

    const value = await this.fetchAuth(body)

    if (value === null) {
			return response.status(HttpCodes.InternalServerError).json({ error: 'Failed to fetch the token.' });
		}

    const now = Date.now();
		const auth = this.container.server.auth!;
		const data = await auth.fetchData(value.access_token);
		if (!data.user) {
			return response.status(HttpCodes.InternalServerError).json({ error: 'Failed to fetch the user.' });
		}

		const token = auth.encrypt({
			id: data.user.id,
			expires: now + value.expires_in * 1000,
			refresh: value.refresh_token,
			token: value.access_token
		});

		response.cookies.add(auth.cookie, token, { maxAge: value.expires_in });
		return response.json(data);
  }

  private async fetchAuth(body: OAuth2BodyData) {
	const { id, secret } = this.container.server.auth!;

	const data: RESTPostOAuth2AccessTokenURLEncodedData = {
		/* eslint-disable @typescript-eslint/naming-convention */
		client_id: id,
		client_secret: secret,
		code: body.code,
		grant_type: 'authorization_code',
		redirect_uri: this.redirectUri ?? body.redirectUri
		/* eslint-enable @typescript-eslint/naming-convention */
	};

	const result = await fetch<any>(OAuth2Routes.tokenURL, {
		method: FetchMethods.Get,
		body: stringify(data as any),
		headers: {
			'content-type': 'application/x-www-form-urlencoded'
		}
	});

	const json = await result.json();
	if (result.ok) return json as RESTPostOAuth2AccessTokenResult;

	this.container.logger.error(json);
	return null;
}
}
