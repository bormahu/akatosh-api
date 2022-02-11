import { NextFunction, Request, Response } from 'express'
import util from 'util'
import { v4 as uuidv4 } from 'uuid';

import { connect } from '../database';
import { GlobalTenements } from '../entities/GlobalTenements';
import { WatchedTenements } from '../entities/WatchedTenements'
import {APILogger} from '../utils/logger';


export let getWatchById = async (req:Request, res: Response, next:NextFunction)=> {
  try{
    const connection = await connect();
    const repo = await connection.getRepository(WatchedTenements);


    const watchId = req.query.watchId;

    // Have to grab the tenements with the correct parent owner
    // repo.find will return an object, as opposed to undefined which will not be caught
    const tenement = await repo.findOne({where: {watchId: watchId}})
    APILogger.logger.info(`[GET][/watch][Returned Object]:${tenement}`);
    // const type = typeof tenement;
    // APILogger.logger.info(`[GET][/watch][Returned TYPE]:${type}`);

    if(tenement === undefined){
      APILogger.logger.info(`[GET][/watch]: failed to find any tenement with watchId: ${watchId}`);
      return res.status(404).send(`No watched tenement with watchId ${watchId}`)
    }
    APILogger.logger.info(`[GET][/watch]: Returned tenement to ${watchId}`);
    return res.status(200).send(tenement);

  }catch(error){
    APILogger.logger.info(`[GET][/watch][ERROR]${error}`);
    return res.status(500).send(error);
  }
}
export let getWatchesByOwnerId = async (req:Request, res: Response, next:NextFunction)=> {
  try{
    const connection = await connect();
    const repo = await connection.getRepository(WatchedTenements);

    console.log(req)
    const ownerId = req.query.ownerId;

    // Have to grab the tenements with the correct parent owner
    // repo.find will return an object, as opposed to undefined which will not be caught
    const tenements = await repo.find({where: {ownerId: ownerId}, relations:['tenement']})
    APILogger.logger.info(`[GET][/watch][Returned Object]:${tenements}`);
    // const type = typeof tenements;

    // APILogger.logger.info(`[GET][/watch][Returned TYPE]:${type}`);

    if(tenements === undefined || tenements.length === 0){
      APILogger.logger.info(`[GET][/watch]: failed to find any tenements with ownerId: ${ownerId}`);
      return res.status(404).send(`No watched tenements with ownerId ${ownerId}`)
    }
    APILogger.logger.info(`[GET][/watch]: Returned tenements to ${ownerId}`);
    console.log(tenements)
    return res.status(200).send(tenements);

  }catch(error){
    APILogger.logger.info(`[GET][/watch][ERROR]${error}`);
    return res.status(500).send(error);
  }
}

export let addWatchedTenement = async (req:Request, res: Response, next:NextFunction)=>{
  try{
    const connection = await connect();
    const repo = await connection.getRepository(WatchedTenements);
    const tenRepo = await connection.getRepository(GlobalTenements);

    const tenementId = req.body.data.tenementId;
    const tenement = await tenRepo.findOne({where: {tenementId: tenementId}})

    // Should be provided with the tenmentId and the user_id
    const watchedTenement: WatchedTenements = {
      ownerId: req.body.data.ownerId,
      tenement: tenement,
      watchId: uuidv4(),
      watchLastUpdate: new Date(),
      watchStartDate: new Date()
    }
    APILogger.logger.info(`[POST][/watch]${watchedTenement.tenement}`);

    await repo.save(watchedTenement);

    return res.status(201).send(watchedTenement)

  } catch(error){
    APILogger.logger.info(`[POST][/watch][ERROR]${error}`);
    return res.status(500).send(error);
  }
}

export let updateWatchedTenement = async (req:Request, res: Response, next:NextFunction)=> {

  try{
    const connection = await connect();
    const repo = connection.getRepository(WatchedTenements);

    const watchId = req.body.data.watchId;
    const ownerId = req.body.data.ownerId
    const watchedTenement =  await repo.findOne({where: {
      ownerId: ownerId,
      watchId: watchId,
    }})

    if(watchedTenement === undefined){
      APILogger.logger.info(`[PATCH][/watch]: failed to find wathed tenement with ID: ${watchId} belonging to ${ownerId}`);
      return res.status(404).send(`Watched tenement with id ${watchId} does not exist`);
    }
    APILogger.logger.info(`[PATCH][/watch]${watchedTenement.tenement}`);

    watchedTenement.watchLastUpdate = new Date() || watchedTenement.watchLastUpdate;

    await repo.save(watchedTenement)

    return res.status(204).send();

  }catch(error){
    APILogger.logger.info(`[PATCH][/watch][ERROR]${error}`);
    return res.status(500).send(error);
  }
}


export let removeWatchedTenement = async (req:Request, res: Response, next:NextFunction)=> {

  try{
    const connection = await connect();
    const repo = connection.getRepository(WatchedTenements);
    // Some issue here with the request coming in to the contoller
    const watchId = req.body.data.watchId;

    const tenement = await repo.findOne({where: {watchId: watchId}});

    if( tenement === undefined){
      APILogger.logger.info(`[DELETE][/watch]: failed to find watched tenement with id: ${watchId}`);
      return res.status(404).send(`Tenement watch of id ${watchId} does not exist`);
    }
    await repo.delete(tenement)
    APILogger.logger.info(`[DELETE][/watch]${tenement.tenement}`);
    return res.status(204).send(`tenement watch with id of${watchId} has been deleted`)

  }catch(error){
    APILogger.logger.info(`[DELETE][/watch][ERROR]${error}`);
    return res.status(500).send(error);
  }
}
