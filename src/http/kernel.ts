import { Container } from '../kernel';
import { Route, Router } from '../router';

export class Kernel {

  /**
   * @param Container container
   */
  protected container: Container;

  /**
   * @param Router router
   */
  protected router: Router;

  /**
   *
   * @param container
   * @param router
   */
  constructor(container: Container, router: Router) {
    this.container = container;
    this.router = router;
  }

  /**
   *
   * @param request
   * @param response
   */
  handle(request, response) {
    const route = this.router.match(request.url);
    console.log('route', route);
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
      return action(route.getParams());
    }

    const {controller, method} = route.getAction();
    const obj = new controller;
    return obj[method];
  }
}