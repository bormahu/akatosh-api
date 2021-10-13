import { NextFunction, Request, Response } from 'express'
// import database from '../database';
import { APILogger } from '../utils/logger'
import { connect } from '../database'
import { v4 as uuidv4 } from 'uuid'
import { Test } from '../entities/Test'
const util = require('util')


export let getUser = async (req: Request, res:Response, next: NextFunction) => {
    try{
        // connecting to DB
        const connection = await connect()
        APILogger.logger.info(`[TYPEORM]: Connection has been established successfully`)
        // Get the entity repo
        const repo = connection.getRepository(Test)

        const username = req.params.username
        // find the item in the table
        const user = await repo.find()
        
        // Return the user and the status code
        const httpStatusCode = user ? 200 : 404
        return res.status(httpStatusCode).send(user)

    }catch (error){
        APILogger.logger.info(`[GET_USER][/test]${error}`)
        return res.status(404).send()
    }  
}
export let addUser = async (req: Request, res:Response, next: NextFunction) => {

    const connection = await connect()
    const repo = connection.getRepository(Test)

    const user : Test = {
        Id: uuidv4(),
        email: req.body.email,
        password: req.body.password,
        registered: false,

    }
    await repo.save(user)
    
    APILogger.logger.info(`[POST][/users]${user.email}`)
      
    return res.status(201).send(user)
}


