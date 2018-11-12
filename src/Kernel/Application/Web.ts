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

    if (cluster.isMaster) {
      console.info(`Master ${process.pid} is running.`);

      this.container.add('kernel', new Kernel(
        this.getContainer(),
        new Router(new Collection())
      ));

      for (let i = 0; i < 1; i++) {
        cluster.fork();
      }

    } else {
      const kernel = this.container.make('kernel');
      this.container.add('server', http.createServer(kernel.handle.bind(kernel)));
      this.container.make('server').listen(8000);
    }
  }
}
