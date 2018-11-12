import { Route } from './Route';

export class Matcher {
  /**
   * @param {string} uri
   */
  protected uri: string;

  /**
   * @param {Route} route
   */
  protected route: Route;

  /**
   *
   * @param {string} uri
   * @param {Route} route
   */
  constructor(uri: string, route: Route) {
    this.uri = uri;
    this.route = route;
  }

  /**
   *
   * @returns {boolean}
   */
  resolves(): boolean {
    const matches = this.regex().exec(this.uri); 

    if (matches) {
      const params = [];
      matches.forEach((key, value) => {
        params[key] = value;
      });
      return true;
    }

    return false;
  }


  /**
   *
   * @returns {RegExp}
   */
  private regex(): RegExp {
    let route = this.route.getUri().trim();

    if (route.indexOf('?') >= -1) {
      route = route.replace(/\/{([\w]+)\?}/, `(?:/{$1})?`);
    }

    route = route.replace(/{([a-z0-9_-]+)}/i, '(?P<$1>[^/]+)');


    if(route[route.length -1] === '/') {
      //route += '?';
    }

  console.log('/%\\');

    return new RegExp('/^\\' + route.trim() + '$', 's');
  }
}
