import { ApplyOptions } from '@sapphire/decorators';
import { Route, methods, ApiRequest } from '@sapphire/plugin-api';

@ApplyOptions<Route.Options>({
  route: '/error/:id'
})
export class ErrorRoute extends Route {
  public [methods.POST](req: ApiRequest) {
    console.log(req.params);
  }
}
