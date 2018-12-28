import { Collection } from '../src';

describe('Router Collection', () => {

  test('can store new routes', () => {
    const collection = new Collection();

    expect(collection.getRoutes().length).toBe(0);
    collection.add('/', 'index', 'MyController@Action');
    expect(collection.getRoutes().length).toBe(1);
  });
});

