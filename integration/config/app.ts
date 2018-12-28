import { DummyService } from '../src/services/dummy';

module.exports = {
  debug: true,
  workers: 0,
  name: 'app',
  timezone: 'UTC',
  charset: 'utf-8',
  services: {
    'sample': () => {
      return 'Sample service';
    },
    DummyService
  }
};

