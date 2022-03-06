"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PluginRoute = void 0;
require("@sapphire/decorators");
const plugin_api_1 = require("@sapphire/plugin-api");
const v10_1 = require("discord-api-types/v10");
const querystring_1 = require("querystring");
const fetch_1 = require("@sapphire/fetch");
class PluginRoute extends plugin_api_1.Route {
    constructor(context) {
        super(context, { route: 'oauth/callback' });
        Object.defineProperty(this, "redirectUri", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        const { server } = this.container;
        this.enabled = server.auth !== null;
        this.redirectUri = server.auth?.redirect;
    }
    async [plugin_api_1.methods.GET](request, response) {
        const body = request.body;
        if (typeof body?.code !== 'string') {
            return response.badRequest();
        }
        const value = await this.fetchAuth(body);
        if (value === null) {
            return response.status(500 /* InternalServerError */).json({ error: 'Failed to fetch the token.' });
        }
        const now = Date.now();
        const auth = this.container.server.auth;
        const data = await auth.fetchData(value.access_token);
        if (!data.user) {
            return response.status(500 /* InternalServerError */).json({ error: 'Failed to fetch the user.' });
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
    async fetchAuth(body) {
        const { id, secret } = this.container.server.auth;
        const data = {
            /* eslint-disable @typescript-eslint/naming-convention */
            client_id: id,
            client_secret: secret,
            code: body.code,
            grant_type: 'authorization_code',
            redirect_uri: this.redirectUri ?? body.redirectUri
            /* eslint-enable @typescript-eslint/naming-convention */
        };
        const result = await (0, fetch_1.fetch)(v10_1.OAuth2Routes.tokenURL, {
            method: "GET" /* Get */,
            body: (0, querystring_1.stringify)(data),
            headers: {
                'content-type': 'application/x-www-form-urlencoded'
            }
        });
        const json = await result.json();
        if (result.ok)
            return json;
        this.container.logger.error(json);
        return null;
    }
}
exports.PluginRoute = PluginRoute;
//# sourceMappingURL=callback.js.map