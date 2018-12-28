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
