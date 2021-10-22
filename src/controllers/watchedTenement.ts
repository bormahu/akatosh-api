import { NextFunction, Request, Response } from 'express'
import { v4 as uuidv4 } from 'uuid';

import { connect } from '../database';
import { GlobalTenements } from '../entities/GlobalTenements';
import { WatchedTenements } from '../entities/WatchedTenements'
import {APILogger} from '../utils/logger';

export let getWatchedTenements = async (req:Request, res: Response, next:NextFunction)=> {
  try{
    const connection = await connect();
    const repo = await connection.getRepository(WatchedTenements);


    const ownerId = req.query.ownerId;

    // Have to grab the tenements with the correct parent owner
    const tenements = await repo.find({where: {ownerId: ownerId}})
    APILogger.logger.info(`[GET][/tenements]:${tenements}`);

    if(tenements === undefined){
      APILogger.logger.info(`[GET][/tenements]: failed to find any tenements with ownerId: ${ownerId}`);
      return res.status(404).send(`No watched tenements with ownerId ${ownerId}`)
    }
    APILogger.logger.info(`[GET][/tenements]: Returned tenements to ${ownerId}`);
    return res.status(200).send(tenements);

  }catch(error){
    APILogger.logger.info(`[GET][/tenements][ERROR]${error}`);
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
    APILogger.logger.info(`[POST][/watched]${watchedTenement.tenement}`);

    await repo.save(watchedTenement);

    return res.status(201).send(watchedTenement)

  } catch(error){
    APILogger.logger.info(`[POST][/watched][ERROR]${error}`);
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
      APILogger.logger.info(`[PATCH][/watched]: failed to find wathed tenement with ID: ${watchId} belonging to ${ownerId}`);
      return res.status(404).send(`Watched tenement with id ${watchId} does not exist`);
    }
    APILogger.logger.info(`[PATCH][/watched]${watchedTenement.tenement}`);

    watchedTenement.watchLastUpdate = new Date() || watchedTenement.watchLastUpdate;

    await repo.save(watchedTenement)

    return res.status(204).send();

  }catch(error){
    APILogger.logger.info(`[PATCH][/watched][ERROR]${error}`);
    return res.status(500).send(error);
  }
}


export let removeWatchedTenement = async (req:Request, res: Response, next:NextFunction)=> {

  try{
    const connection = await connect();
    const repo = connection.getRepository(WatchedTenements);

    const watchId = req.body.data.watchId;

    const tenement = await repo.findOne({where: {watchId: watchId}});

    if( tenement === undefined){
      APILogger.logger.info(`[DELETE][/watched]: failed to find watched tenement with id: ${watchId}`);
      return res.status(404).send(`Tenement watch of id ${watchId} does not exist`);
    }
    await repo.delete(tenement)
    APILogger.logger.info(`[DELETE][/watched]${tenement.tenement}`);
    return res.status(204).send(`tenement watch with id of${watchId} has been deleted`)

  }catch(error){
    APILogger.logger.info(`[DELETE][/watched][ERROR]${error}`);
    return res.status(500).send(error);
  }
}
