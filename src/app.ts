import express, { Application } from 'express';
import morgan from 'morgan';

import indexRoutes from './routes/index.routes';

export class App {
   private app: Application;

   constructor(private port?: number) {
      this.app = express();

      this.settings();
      this.middlewares();
      this.routes();
   }

   settings() {
      this.app.set('port', this.port || 8080);
   }

   middlewares() {
      this.app.use(morgan('dev'));
      this.app.use(express.json());
   }

   routes() {
      this.app.use(indexRoutes);
   }

   async listen() {
      await this.app.listen(this.app.get('port'));
      console.log(`Server on port`, this.app.get('port'));
   }
}