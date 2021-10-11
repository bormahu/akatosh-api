import { NextFunction, Request, Response } from 'express'
// import {default as Test} from '../model/Test'
import Test, { UserMap } from '../model/test';
import database from '../database';
import User from '../model/User';
import {APILogger} from '../utils/logger'
import * as util from 'util'



// export let getDBTest = (req: Request, res:Response, next: NextFunction) => {
//     UserMap(database);
//     const
// }


export let getUser = async (req: Request, res:Response, next: NextFunction) => {
    // UserMap takes a Sequelize object
    UserMap(database);
    let str = util.inspect(database)

    APILogger.logger.info(`[GETUSER] [/test] [database]${str}`)
    // Set the username from the search param
    const userId = req.params.id
    APILogger.logger.info(`[GET][/test]${userId}`)

    const user = await Test.findByPk(userId)
    APILogger.logger.info(`[GET][/test]${user}`)
    const httpStatusCode = user ? 200 : 404
    return res.status(httpStatusCode).send(user)
    
}

// export let addUser = (req:Request, res:Response, next:NextFunction) =>{
//     let newUser = req.body as Test

//     UserMap(database);

//     const result = Test.create(newUser);
    
//     return res.status(201).send(newUser)
// }

// export let addUser = (req:Request, res:Response, next:NextFunction) => {
//   const user:Test = {
//     id: Math.floor(Math.random()*100)+1,
//     firstName: req.body.firstName,
//     secondName: req.body.secondName,
//     dob: req.body.dob,
//     email: req.body.email,
//   }
//   users.push(user)
//   
// }

