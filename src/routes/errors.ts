import { ApplyOptions } from "@sapphire/decorators";
import { Route, RouteOptions, methods, ApiRequest, ApiResponse } from "@sapphire/plugin-api";

@ApplyOptions<RouteOptions>({
    route: '/error/:id',
})

export class ErrorRoute extends Route {

    public async [methods.POST] (req: ApiRequest, res: ApiResponse) {
        console.log(req.params)
    }
}