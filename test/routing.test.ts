import { Collection, Route } from '../src/Routing';

describe('Router Collection', () => {

  test('can store new routes', () => {
    const collection = new Collection();

    expect(collection.getRoutes().length).toBe(0);
    collection.add('/', 'index', 'MyController@Action');
    expect(collection.getRoutes().length).toBe(1);
  });
});

describe('Route', () => {

  function badRoute() {
    new Route('/', '', '');
  }

  test('information can be retrieved', () => {
    const route = new Route('/', 'index', 'MyController@action');
    expect(route.getUri()).toBe('/');

    expect(route.getAction()).toEqual({controller: 'MyController', action: 'action'});
  });

  test('throws an error with invalid actions', () => {
    expect(badRoute).toThrow(Error);
  });

  test('can take a callback as an action', () => {
    const route = new Route('/', '', () => {
      return 'Hello, World!';
    });

    expect(typeof route.getAction()).toBe('function');
    expect(route.getAction()()).toEqual('Hello, World!');
  });

  test('can be matched against a real request uri', () => {

    const route = new Route('/', '', (req, res) => {
      console.log('here');
    });

    expect(route.matches('/foo')).not.toBeTruthy();
    expect(route.matches('/')).toBeTruthy();
  });
});
