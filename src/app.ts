import * as bodyParser from 'body-parser'
import * as express from 'express'
import * as expressWinston from 'express-winston'
import * as winston from 'winston'
import {APIRoute} from '../src/routes/api'
import { Index } from '../src/routes/index'
import {CompanyRoute} from '../src/routes/company'
import {UserRoute} from '../src/routes/user'
import {TenementRoute} from '../src/routes/tenement'
import {TestRoute} from '../src/routes/test'

class App {
  public app: express.Application
  public indexRoutes:Index= new Index()
  public userRoutes:UserRoute = new UserRoute()
  public companyRoutes:CompanyRoute = new CompanyRoute()
  public apiRoutes: APIRoute = new APIRoute()
  public tenementRoutes: TenementRoute = new TenementRoute()
  public testRoute: TestRoute = new TestRoute()

  constructor() {
    this.app = express()
    this.app.use(bodyParser.json())
    this.indexRoutes.routes(this.app)
    this.userRoutes.routes(this.app)
    this.companyRoutes.routes(this.app)
    this.apiRoutes.routes(this.app)
    this.tenementRoutes.routes(this.app)
    this.testRoute.routes(this.app)
    this.app.use(
      expressWinston.errorLogger({
        transports: [new winston.transports.Console()],
      })
    )
   }
 }
export default new App().app
