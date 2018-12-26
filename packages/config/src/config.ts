import * as fs from 'fs';

export class Config {
  protected path: string;
  protected env: string;
  protected configs: any = {};

  constructor(path: string, env: any) {
    this.path = path;
    this.env = env;
    this.load();
    console.debug(`[${process.pid}] Configurations loaded.`);
  }

  get(key: string, value?) {
    if (typeof this.configs[key] !== 'undefined') {
      return this.configs[key];
    }
  }

  set(key: string, value: any): this {
    this.configs[key] = value;
    return this;
  }

  load() {
    const files = fs.readdirSync(`${this.path}/config`);
    files.forEach(file => {
      this.configs[file.replace('.ts', '')] = require(`${this.path}/config/${file}`);
    });
  }
}
