import * as fs from 'fs';


export class Config {
  protected path: string;
  protected env: string;
  protected configs: Array<any> = [];

  constructor(path: string, env: string) {
    this.path = path;
    this.env = env;
    this.load();
    console.debug(`[${process.pid}] Configurations loaded.`);
  }

  get(key: string, value?) {
    if (this.configs.indexOf(key) !== -1) {
      return this.configs[key];
    }
  }

  set(key: string, value: any) {
    const configs = this.configs;
  }

  load() {
    const self = this;
    fs.readdir(`${this.path}/config`, function (err, items) {
      console.log(items);

      for (let i = 0; i < items.length; i++) {
        self.configs[items[i].replace('.ts', '')] = require(`${self.path}/config/${items[i]}`);
      }
      console.log('configs', self.configs);
    });
  }
}
