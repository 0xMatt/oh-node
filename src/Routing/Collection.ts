import { Route } from './Route';

export class Collection {

  /**
   *
   * @type {any[]}
   */
  protected routes: Array<Route> = [];

  /**
   *
   * @returns {Array<Route>}
   */
  getRoutes(): Array<Route> {
    return this.routes;
  }

  /**
   *
   * @param {string} route
   * @param {string} name
   * @param {string} action
   * @param options
   * @returns {this}
   */
  add(route: string, name: string, action: string, options?) {
    this.routes = this.routes.concat([new Route(route, name, action, options)]);

    return this;
  }
}
