import { App } from '../App';
import { Kernel } from '../../Http';
import { Collection, Router } from '../../Routing';

import * as http from 'http';
import * as cluster from 'cluster';

export class Web extends App {

  /**
   *
   */
  boot() {

    const config = this.container.make('config');

    const kernel = new Kernel(
        this.getContainer(),
        new Router(config.get('routes'))
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
