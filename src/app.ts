import "reflect-metadata";

import * as bodyParser from 'body-parser';
import * as dotenv from 'dotenv';
import * as express from 'express';
import * as expressWinston from 'express-winston';
import * as morgan from 'morgan';
import * as winston from 'winston';

import {APILogger} from './utils/logger';
import { APIRoute } from '../src/routes/api';
import { AreaOfInterestRoute } from './routes/areaOfInterest';
import { CompanyRoute } from '../src/routes/company';
import { GlobalTenementRoute } from './routes/globalTenements';
import { Index } from '../src/routes/index';
import { UserRoute } from '../src/routes/user';
import { WatchedTenementRoute } from './routes/watchedTenement';

dotenv.config({
  path:'/Users/neilshevlin/Desktop/akatosh-api/.env'
})

class App {
  public app: express.Application;
  public apiRoutes: APIRoute = new APIRoute();
  public indexRoutes:Index= new Index();
  public companyRoutes:CompanyRoute = new CompanyRoute();
  public userRoutes:UserRoute = new UserRoute();
  public watchedTenementRoutes:WatchedTenementRoute = new WatchedTenementRoute();
  public globalTenementRoutes: GlobalTenementRoute = new GlobalTenementRoute();
  public areaOfInterestRoutes: AreaOfInterestRoute = new AreaOfInterestRoute();


  constructor() {
    this.app = express();
    this.apiRoutes.routes(this.app);
    this.app.use(bodyParser.json())
    this.indexRoutes.routes(this.app);
    this.companyRoutes.routes(this.app);
    this.userRoutes.routes(this.app);
    this.watchedTenementRoutes.routes(this.app);
    this.globalTenementRoutes.routes(this.app);
    this.areaOfInterestRoutes.routes(this.app);
    // this.app.use(morgan(':method :url :status :res[content-length] - :response-time ms'))
    this.app.use(
      expressWinston.errorLogger({
        transports: [new winston.transports.Console()],
      })
    );
   }
 }
export default new App().app;
