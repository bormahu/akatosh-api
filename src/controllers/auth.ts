import * as bcrypt from 'bcrypt'
import { NextFunction, Request, Response } from 'express';
import * as jwt from 'jsonwebtoken'
import { secret } from "../config";
import { connect } from '../database';
import { User } from '../entities/User';
import { APILogger } from '../utils/logger';

export let login = async (req: Request, res: Response, next: NextFunction) => {
    try{
        const connection = await connect();
        const repo = await connection.getRepository(User);
    
        const username = req.body.data.username;
        const password = req.body.data.password;
    
        const user = await repo.findOne({where: {username: username}});
        
        if(user === undefined){
          APILogger.logger.info(`[POST][/users/login]: Failed to login, user: ${username} does not exist`);
          return res.status(404).send(`Cannot login: User - ${username} does not exist`);
        }
        const validate = bcrypt.compareSync(password, user.password.valueOf())
    
        if(validate){
            const body = {id: user.userId, email: user.email}
            const token = jwt.sign({user:body}, secret, {expiresIn: '2h'})
          APILogger.logger.info(`[POST][/users/login]: User - ${username} successfuly logged in`);
          return res.json({token: token})
        } else {
          return res.status(401).send()
        }
      } catch(error) {
        APILogger.logger.info(`[GET][/users/login][ERROR]${error}`);
        return res.status(500).send(error);
      }
}