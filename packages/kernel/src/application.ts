import { Container } from './container';
import { Service } from './service';
import { Config } from '@oh-node/config';

export abstract class Application {

  /**
   * @param string
   */
  protected version: string = '0.0.0';

  /**
   * @param boolean
   */
  protected initialized = false;

  /**
   * @param string The application path
   */
  protected path: string;

  /**
   * @param Container
   */
  protected container: Container;

  /**
   * @param Config
   */
  protected config: Config;

  /**
   *
   * @type {any[]}
   */
  protected services: Array<Service> = [];

  /**
   *
   * @param path
   */
  constructor(path: any) {
    process.env['APP_PATH'] = path;
    this.path = path;
    this.config = new Config(this.getPath());
    this.container = new Container();
    this.container.add('config', this.config);
  }

  getVersion(): string {
    return this.version;
  }

  isInitialized(): boolean {
    return this.initialized === true;
  }

  getContainer(): Container {
    return this.container;
  }

  getPath(): string {
    return this.path;
  }

  getConfig(): Config {
    return this.config;
  }

  abstract boot(): void;
}
