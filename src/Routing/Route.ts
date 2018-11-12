import { Matcher } from './Matcher';

export class Route {
  protected uri;
  protected name;
  protected action;
  protected options;
  protected params;

  /**
   *
   * @param uri
   * @param name
   * @param action
   * @param options
   */
  constructor(uri, name, action, options?) {
    this.uri = uri;
    this.name = name;
    this.action = action;
    this.options = options;

    if (typeof this.action !== 'function' && this.action.indexOf('@') === -1) {
      throw new Error('Invalid action');
    }
  }

  /**
   *
   * @returns {any}
   */
  getUri() {
    return this.uri;
  }

  /**
   *
   * @returns {any}
   */
  getAction() {
    if (typeof this.action === 'function') {
      return this.action;
    }

    const [controller, action] = this.action.split('@');

    return {controller, action};
  }

  /**
   *
   * @param {string} path
   * @returns {boolean}
   */
  matches(path: string) {
    const matcher = new Matcher(path, this);
    return matcher.resolves();
  }

  /**
   *
   * @param params
   */
  setParams(params: any) {
    this.params = params;
  }

  /**
   *
   * @returns {any}
   */
  getParams() {
    return this.params;
  }
}
