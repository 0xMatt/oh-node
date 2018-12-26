import { Collection, Route, Router } from '../src';

describe('Router', () => {
  test('can match existing route', () => {
    const collection = new Collection();
    collection.add('/', '', 'test@test');
    const router = new Router(collection);
    expect(router.match('/')).toBeTruthy();
  });

  test('won\'t resolve an invalid route', () => {
    const router = new Router(new Collection());
    expect(router.match('/')).toBeFalsy();
  });
});


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
    });

    const route2 = new Route('/foo/:bar', 'test2', () => console.log('got it2'));

    expect(route.matches('/foo')).not.toBeTruthy();
    expect(route.matches('/')).toBeTruthy();

    expect(route2.matches('/foo/baz')).toBeTruthy();
  });

  test('can set and get params', () => {
   const route = new Route('/foo/:bar', '', (req, res) => {
    console.log(req.params);
   });

    expect(route.matches('/foo/ber')).toBeTruthy();

    route.setParams({foo: 'bar'});
    const params = route.getParams();
    expect(params.foo).toEqual('bar');
  });
});
