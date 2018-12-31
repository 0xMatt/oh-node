import { Config } from './../src';

describe('Config', () => {

  const path = process.cwd() + '/packages/config/test/mocks';

  it('can be loaded', () => {
    const config = new Config(path);
    expect(config.get()).toEqual({app: {foo: 'bar'}});
  });

  it('can get specific configurations', () => {
    const config = new Config(path);
    expect(config.get('app')).toEqual({foo: 'bar'});
  });

  it('can override existing settings', () => {
    const config = new Config(path);
    expect(config.get('app')).toEqual({foo: 'bar'});
    config.set('app', {bar: 'baz'});
    expect(config.get('app')).toEqual({bar: 'baz'});
  });

});
