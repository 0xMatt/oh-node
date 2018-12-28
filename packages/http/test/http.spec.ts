import { Kernel } from '../src/kernel';
import { Container } from '@oh-node/kernel';
import { Router, Collection } from '@oh-node/router';

describe('http kernel', () => {
  test('can handle requests', () => {
    const kernel = new Kernel(
      new Router(new Collection())
    );

    const request = new Request,
      response = new Response;
    expect(response.statusCode).toBe(undefined);
    kernel.handle(request, response);
    expect(response.statusCode).toEqual(404);
  });

  test('can resolve requests', () => {

    const routes = new Collection;
    routes.add('/', 'index', 'test@test');
    routes.add('/foo', 'foo', () => {
      return 1;
    });

    const kernel = new Kernel(new Router(routes));
    expect(kernel.resolve(routes.getRoutes()[1], {}, {})).toEqual(1);

  });
});

class Request {}
class Response {
  statusCode: number;
  body: any;

  writeHead(statusCode: number) {
    this.statusCode = statusCode;
  }
  end(body: any) {
    this.body = body;
  }
}
