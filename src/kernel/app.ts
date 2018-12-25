import { Container } from './container';
import { Service } from './service';
import * as cluster from 'cluster';
import * as dotenv from 'dotenv';
import { Config } from '../config';

export abstract class App {

  /**
   * @param string
   */
  protected version: string = '0.1.0';

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
  constructor(path: string) {
    process.env['APP_PATH'] = path;
    this.path = path;
    this.config = new Config(this.getPath(), dotenv.config());
    this.container = new Container;
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
