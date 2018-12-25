import { Container } from './container';

export abstract class Service {
  /**
   * @param container Container
   */
  container: Container;

  /**
   * @param container Container
   */
  constructor(container: Container) {
    this.container = container;
  }

  abstract bootstrap();
}
