import { Route } from '../src';

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
