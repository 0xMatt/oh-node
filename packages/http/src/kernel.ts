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
      response.end(this.resolve(route));
    } catch {
      response.writeHead(500);
      response.end('Internal Server Error');
    }
  }

  /**
   *
   * @param route
   */
  resolve(route: Route) {
    if (typeof route.getAction === 'function') {
      const action = route.getAction();
      console.log('action', action);
      return action(route.getParams());
    }

    const {controller, method} = route.getAction();
    const obj = new controller;
    return obj[method];
  }
}
