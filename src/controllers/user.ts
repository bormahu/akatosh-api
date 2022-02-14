import * as bcrypt from 'bcrypt'
import { NextFunction, Request, Response } from 'express';
import * as jwt from 'jsonwebtoken'
import utils from 'util'
import { v4 as uuidv4 } from 'uuid';
import { secret } from "../config";
import { connect } from '../database';
import { User } from '../entities/User';
import { APILogger } from '../utils/logger';


const util = require('util');

export let addUser = async (req:Request, res:Response, next:NextFunction) => {
  try{
    const connection = await connect();

    const repo = connection.getRepository(User);

    // Add in password encryption
    const user: User = {
      accountCreation: new Date(),
      accountVerified: new Date(),
      email: req.body.data.email,
      firstName: req.body.data.firstName,
      lastName: req.body.data.lastName,
      latestSignin: new Date(),
      password: bcrypt.hashSync(req.body.data.password, 10),
      userCompany: req.body.data.userCompany,
      userId: uuidv4(),
      userType: req.body.data.userType,
      username: req.body.data.username,
      verified: false,
    }
    APILogger.logger.info(`[POST][/users][addUser] ${user.username}`);

    // Add the user to the DB
    await repo.save(user);

    return res.status(201).send(user);

  } catch(error) {
    APILogger.logger.info(`[POST][/users][addUser][ERROR]${error}`);
    return res.status(500).send(error);
  }
}

export let getUser = async (req: Request, res:Response, next: NextFunction) => {
  try{
    
    // Make the connection to the DB
    const connection = await connect();
    const repo = connection.getRepository(User);
    
    const username = req.query.username;
    APILogger.logger.info(`[GET][/users]${username}`);

    // Search the database by username
    const user = await repo.findOne( { where: { username: username } } );

    if(user === undefined){
      APILogger.logger.info(`[GET][/users]: failed to find user: ${username}`);
      return res.status(404).send(`User ${username} does not exist`);
    }
    APILogger.logger.info(`[GET][/users]: Returned user ${user}`);
    return res.status(200).send(user);

  } catch(error) {
    APILogger.logger.info(`[GET][/users][ERROR]${error}`);
    return res.status(500).send(error);
  }
}

export let removeUser = async (req:Request, res: Response, next: NextFunction) => {
  try{
    const connection = await connect();
    const repo = await connection.getRepository(User);

    const username = req.body.data.username;
    const user = await repo.findOne({where: {username: username}});

    if(user === undefined){
      APILogger.logger.info(`[DELETE][/users]: failed to find user: ${username}`);
      return res.status(404).send(`User ${username} does not exist`);
    }

    await repo.delete({username: username});
    APILogger.logger.info(`[DELETE][/users]${username}`);

    return res.status(204).send(`User ${username} has been deleted`);

  } catch(error) {
    APILogger.logger.info(`[DELETE][/users][ERROR]${error}`);
    return res.status(500).send(error);
  }
}

export let updateUser = async (req:Request, res:Response, next: NextFunction) => {
  try{
    const connection = await connect();
    const repo = connection.getRepository(User);

    const username = req.body.data.username;
    APILogger.logger.info(`${username}`);
    const user = await repo.findOne({where: {username: username}});
    

    if(user === undefined){
      APILogger.logger.info(`[PATCH][/users]: failed to find user: ${username}`);
      return res.status(404).send(`User ${username} does not exist`);
    }
    APILogger.logger.info(`[PATCH][/users]${user}`);
    
    // What will the policy be here when wanting to change details?
    // ideally it should only work with correct auth
    user.username = req.body.data.username || user.username;
    user.firstName = req.body.data.firstName || user.firstName;
    user.lastName = req.body.data.lastName|| user.lastName;
    user.email = req.body.data.email || user.email;
    user.password = req.body.data.password || user.password;
    user.userCompany = req.body.data.userCompany || user.userCompany;
    user.userType = req.body.data.userType || user.userType;

    await repo.save(user);

    return res.status(204).send();

  } catch(error) {
    APILogger.logger.info(`[PATCH][/users][ERROR]${error}`);
    return res.status(500).send(error);
  }
}
