import { NextFunction, Request, Response } from 'express';
import { User } from '../entities/User';
import {APILogger} from '../utils/logger';
import { v4 as uuidv4 } from 'uuid';

import { connect } from '../database';

export let getUser = async (req: Request, res:Response, next: NextFunction) => {
  try{
    // Make the connection to the DB
    const connection = await connect();

    // Get the repo connection
    const repo = connection.getRepository(User);

    const username = req.params.username;
    APILogger.logger.info(`[GET][/users]${username}`);

    // Search the database by username
    const user = await repo.findOne( { where: { username: username } } );
    APILogger.logger.info(`[GET][/users]: Returned user ${user.username}`);
    
    // This seems redundant? if the user is found they will have an ID?
    // Can this be removed once we know the response of findOne when there's no such user. 
    const hasId = await repo.hasId(user);

    if (!hasId){
      APILogger.logger.info(`[GET][/users]: failed to find user: ${username}`);
      return res.status(404).send(`User ${username} does not exist`);
    }
    return res.status(200).send(user);

  } catch(error) {
    APILogger.logger.info(`[GET][/users][ERROR]${error}`);
    return res.status(500).send(error);
  }
}

export let addUser = async (req:Request, res:Response, next:NextFunction) => {
  try{
    const connection = await connect();

    const repo = connection.getRepository(User);

    // Add in password encryption
    const user: User = {
      user_id: uuidv4(),
      username: req.body.username,
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email,
      password: req.body.password,
      user_company: req.body.user_company,
      user_type: req.body.user_type,
      verified: false,
      account_creation: new Date(),
      account_verified: new Date(),
      latest_signin: new Date(),
    }
    APILogger.logger.info(`[POST][/users]${user.username}`);

    // Add the user to the DB
    await repo.save(user);

    return res.status(201).send(user);

  } catch(error) {
    APILogger.logger.info(`[POST][/users][ERROR]${error}`);
    return res.status(500).send(error);
  }
}

export let updateUser = async (req:Request, res:Response, next: NextFunction) => {
  try{
    const connection = await connect();
    const repo = connection.getRepository(User);

    const username = req.body.username;
    const user = await repo.findOne({where: {user_name: username}});
    APILogger.logger.info(`[PATCH][/users]${user}`);

    const has_id = await repo.hasId(user);

    if(!has_id){
      return res.status(404).send("User does not exist");
    }
    
    user.username = req.body.username || user.username;
    user.first_name = req.body.firstName || user.first_name;
    user.last_name = req.body.firstname || user.last_name;
    user.email = req.body.email || user.email;
    user.password = req.body.password || user.password;
    user.user_company = req.body.user_company || user.user_company;
    user.user_type = req.body.user_type || user.user_type;

    await repo.save(user);

    return res.status(204).send();

  } catch(error) {
    APILogger.logger.info(`[PATCH][/users][ERROR]${error}`);
    return res.status(500).send(error);
  }
}
export let removeUser = async (req:Request, res: Response, next: NextFunction) => {
  try{
    const connection = await connect();
    const repo = await connection.getRepository(User);

    const username = req.body.username;
    const user = await repo.findOne({where: {user_name: username}});

    const has_id = await repo.hasId(user);

    if (!has_id){
      return res.status(404).send("User does not exist");
    }

    await repo.delete({username: username});
    APILogger.logger.info(`[DELETE][/users]${username}`);

    return res.status(204).send(`User ${username} has been deleted`);

  } catch(error) {
    APILogger.logger.info(`[DELETE][/users][ERROR]${error}`);
    return res.status(500).send(error);
  }
}
