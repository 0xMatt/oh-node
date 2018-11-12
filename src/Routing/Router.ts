import { Collection } from './Collection';
import { Route } from './Route';

export class Router {

  /**
   * @param {Collection} routes
   */
  protected routes: Collection;

  /**
   *
   * @param {Collection} routes
   */
  constructor(routes: Collection) {
    this.routes = routes;
  }

  /**
   *
   * @param {string} request
   * @returns {any}
   */
  resolve(request: string) {
    const route = this.match(request);

    if (route.length === 0) {
      return false;
    }

    return route[0];
  }

  /**
   *
   * @param request
   * @returns {Route[]}
   */
  private match(request) {
    return this.routes.getRoutes().filter((route: Route) => {
      const match = route.matches(request);
      if (false !== match) {
        return route.setParams(match);
      }
    });
  }
}
