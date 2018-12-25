import { App } from '../app';


import * as http from 'http';
import * as cluster from 'cluster';
import { Collection, Router } from '../../router';
import { Kernel } from '../../http';

export class Web extends App {

  /**
   *
   */
  boot() {

    const config = this.container.make('config');
    const routes = config.get('routes');
    const collection = new Collection();
    routes.forEach(route => {
      collection.add(route.path, route.name, route.action);
    });

    console.debug(`[Router] Loaded ${collection.getRoutes().length} routes.`, collection);

    const kernel = new Kernel(
      this.getContainer(),
      new Router(collection)
    );

    if (cluster.isMaster) {
      console.info(`Master ${process.pid} is running.`);

      for (let i = 0; i < 1; i++) {
        cluster.fork();
      }

    } else {
      const server = http.createServer((req, res) => kernel.handle(req, res));

      console.info(`Worker ${process.pid} spawned HTTP Server on port 8000`);

      server.listen(8000);
    }
  }
}
