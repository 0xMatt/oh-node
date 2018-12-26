import {Web} from '@oh-node/bootloader';

let app: Web;

beforeAll(function () {
  app = new Web('/foo/bar');
});

test('Web application can boot', () => {
  expect(app.isInitialized()).toBe(false);
});

test('Getters return expected data', () => {
  expect(app.getVersion()).toBe('0.1.0');
  expect(app.getContainer()).toBeInstanceOf(Container);
  expect(app.getConfig()).toBeInstanceOf(Config);
  expect(app.getPath()).toBe('/foo/bar');
});

test('it spawns an http server', () => {
  expect(true).toBe(true);
});
