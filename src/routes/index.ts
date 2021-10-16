import { Request, Response } from 'express'
import * as cors from 'cors'

import * as dotenv from 'dotenv';

dotenv.config({
    path:'/Users/neilshevlin/Desktop/akatosh-api/.env'
})

const corsOptions = {
  origin: process.env.CLIENT_URL
}

export class Index {
  public routes(app): void {
    // router is passed app and can use cors middleware
    app.use(cors(corsOptions))
    app.route('/index').get((req: Request, res: Response) => {
      res.status(200).send({ status: 'success' })
  }) 
}}
