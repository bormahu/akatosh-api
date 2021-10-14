import { NextFunction, Request, Response } from 'express'
import { WatchedTenements } from '../entities/WatchedTenements'
import {APILogger} from '../utils/logger';
import { v4 as uuidv4 } from 'uuid';

import { connect } from '../database';
import { TenementRoute } from '../routes/tenement';

export let getTenements = async (req:Request, res: Response, next:NextFunction)=> {
  try{
    const connection = await connect();
    const repo = connection.getRepository(WatchedTenements);

    const owner_id = req.body.owner_id;

    // Have to grab the tenements with the correct parent owner
    const tenements = repo.find({where: {onwer_id: owner_id}})

    if(tenements === undefined){
      APILogger.logger.info(`[GET][/tenements]: failed to find any tenements with owner_id: ${owner_id}`);
      return res.status(404).send(`No watched tenements with owner_id ${owner_id}`)
    }
    APILogger.logger.info(`[GET][/tenements]: Returned tenements to ${owner_id}`);
    return res.status(200).send(tenements);

  }catch(error){
    APILogger.logger.info(`[GET][/tenements][ERROR]${error}`);
    return res.status(500).send(error);
  }
}

export let addTenement = async (req:Request, res: Response, next:NextFunction)=>{
  try{
    const connection = await connect();
    const repo = await connection.getRepository(WatchedTenements);

    // Should be provided with the tenmentId and the user_id
    const watched_tenement: WatchedTenements = {
        watch_id: uuidv4(),
        tenement_id: req.body.tenement_id,
        owner_id: req.body.owner_id,
        watch_start_date: new Date(),
        watch_last_update: new Date(),
    }
    APILogger.logger.info(`[POST][/watched]${watched_tenement.tenement_id}`);

    await repo.save(watched_tenement);

    return res.status(201).send(watched_tenement)

  } catch(error){
    APILogger.logger.info(`[POST][/watched][ERROR]${error}`);
    return res.status(500).send(error);
  }
}

export let updateWatchedTenement = async (req:Request, res: Response, next:NextFunction)=> {

  try{
    const connection = await connect();
    const repo = connection.getRepository(WatchedTenements);

    const watch_id = req.body.watch_id;
    const owner_id = req.body.owner_id
    const watched_tenement =  await repo.findOne({where: {
      watch_id: watch_id,
      owner_id: owner_id
    }})

    if(watched_tenement === undefined){
      APILogger.logger.info(`[PATCH][/watched]: failed to find wathed tenement with ID: ${watch_id} belonging to ${owner_id}`);
      return res.status(404).send(`Watched tenement with id ${watch_id} does not exist`);
    }
    APILogger.logger.info(`[PATCH][/watched]${watched_tenement.tenement_id}`);

    watched_tenement.watch_last_update = new Date() || watched_tenement.watch_last_update;

    await repo.save(watched_tenement)

    return res.status(204).send();

  }catch(error){
    APILogger.logger.info(`[PATCH][/watched][ERROR]${error}`);
    return res.status(500).send(error);
  }
}


export let removeTenement = async (req:Request, res: Response, next:NextFunction)=> {

  try{
    const connection = await connect();
    const repo = connection.getRepository(WatchedTenements);

    const watch_id = req.body.watch_id;

    const tenement = await repo.findOne({where: {watch_id: watch_id}});

    if( tenement === undefined){
      APILogger.logger.info(`[DELETE][/watched]: failed to find watched tenement with id: ${watch_id}`);
      return res.status(404).send(`Tenement watch of id ${watch_id} does not exist`);
    }
    await repo.delete(tenement)
    APILogger.logger.info(`[DELETE][/watched]${tenement.tenement_id}`);
    return res.status(204).send(`tenement watch with id of${watch_id} has been deleted`)

  }catch(error){
    APILogger.logger.info(`[DELETE][/watched][ERROR]${error}`);
    return res.status(500).send(error);
  }
}
