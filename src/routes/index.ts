import { Request, Response } from 'express'
import * as cors from 'cors'
export class Index {
  public routes(app): void {
    // router is passed app and can use cors middleware
    app.use(cors())
    app.route('/index').get((req: Request, res: Response) => {
      res.status(200).send({ status: 'success' })
  }) 
}}
