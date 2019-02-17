import { Route, Router } from '@oh-node/router';

export class Kernel {

  /**
   * @param Router router
   */
  protected router: Router;

  /**
   *
   * @param router
   */
  constructor(router: Router) {
    this.router = router;
  }

  /**
   *
   * @param request
   * @param response
   */
  handle(request, response) {
    const route = this.router.match(request.url);
    if (!route) {
      response.writeHead(404);
      return response.end('Page not found');
    }

    try {
      response.writeHead(200);
      response.end(this.resolve(route, request, response));
    } catch {
      response.writeHead(500);
      response.end('Internal Server Error');
    }
  }

  /**
   *
   * @param route
   */
  resolve(route: Route, request: any, response: any) {
    const action = route.getAction();
    if (typeof action == 'function') {
      return action(request, response);
    }
    const {controller, method} = action;

    const obj = new controller;
    return obj[method];
  }
}
