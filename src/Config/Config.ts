export class Config {
  protected path: string;
  protected env: string;
  protected configs: Array<any> = [];

  constructor(path: string, env: string) {
    this.path = path;
    this.env = env;
    this.load();
  }

  get(key: string, value?) {
    if (this.configs.indexOf(key) !== -1) {

    }
  }

  set(key: string, value: any) {
    const configs = this.configs;

  }

  load() {
    this.configs = [process.env];
  }
}
