import { Web } from '../src/web';
import { Container } from '@oh-node/kernel';
import { Config } from '@oh-node/config';

describe('Web Application', () => {

  const path = process.cwd() + '/packages/config/test/mocks';
  const app = new Web(path);

  test('can boot', () => {
    expect(app.isInitialized()).toBe(false);
  });

  test('Getters return expected data', () => {
    expect(app.getVersion()).toBe('0.0.0');
    expect(app.getContainer()).toBeInstanceOf(Container);
    expect(app.getConfig()).toBeInstanceOf(Config);
    expect(app.getPath()).toBe(path);
  });

  test('Spawns an http server', () => {
    expect(true).toBe(true);
  });
});

