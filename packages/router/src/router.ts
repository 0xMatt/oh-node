import { Collection } from './collection';
import { Route } from './route';

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
   * @param {string} uri
   * @returns {any}
   */
  match(uri: string) {
    const route = this.resolve(uri);
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
  private resolve(uri) {
    return this.routes.getRoutes().filter((route: Route) => {
      const match = route.matches(uri);
      if (match) {
        route.setParams(match);
      }
      return match;
    });
  }
}
