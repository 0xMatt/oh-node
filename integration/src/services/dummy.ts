import { Service } from '@oh-node/kernel';

export class Dummy extends Service {
  bootstrap() {
    const service = new DummyService('ping');
    this.container.add('dummy', service);
  }
}

export class DummyService {
  private foo: string;

  constructor(foo: string) {
    this.foo = foo;
  }
}
