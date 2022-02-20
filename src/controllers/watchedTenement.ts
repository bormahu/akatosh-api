import { NextFunction, Request, Response } from 'express'
import util from 'util'
import { v4 as uuidv4 } from 'uuid';

import { connect } from '../database';
import { GlobalTenements } from '../entities/GlobalTenements';
import { WatchedTenements } from '../entities/WatchedTenements'
import {APILogger} from '../utils/logger';
import jwt_decode from "jwt-decode";

export let getWatch = async (req: Request, res: Response, next: NextFunction) => {
  try{
    const connection = await connect();
    const repo = await connection.getRepository(WatchedTenements);

    // store id that is passed in through watch/:id
    const watchId = req.params.id;

    const watch = await repo.findOne({where: { watchId: watchId}});
    if (watch === undefined) {
      APILogger.logger.info(`[GET][/watchedTenements]: failed to find any watched tenements with watchId: ${watchId}`);
      return res.status(404).send(`No watched tenements with watchId ${watchId}`)
    }
    return res.status(200).send(watch);

  }catch(error){
    APILogger.logger.info(`[GET][/watch][ERROR]${error}`);
    return res.status(500).send(error);
  }
}
export let getWatches = async (req: Request, res: Response, next: NextFunction) => {
  try{
    const connection = await connect();
    const repo = await connection.getRepository(WatchedTenements);

    const skip = Number(req.query.skip) || Number(0);
    const take = Number(req.query.limit) || Number(100);

    const watches = await repo.find({
      skip: Number(skip),
      take: Number(take)
    });

    if (watches === undefined || watches.length === 0) {
      APILogger.logger.info(`[GET][/watches]: failed to find any watches`);
      return res.status(404).send(`Failed to find watches`)
    }
    return res.status(200).send(watches);

  }catch(error){
    APILogger.logger.info(`[GET][/watches][ERROR]${error}`);
    return res.status(500).send(error);
  }
}
export let getWatchesByOwner = async (req: Request, res: Response, next: NextFunction) => {
  try{
    const connection = await connect();
    const repo = await connection.getRepository(WatchedTenements);

    const ownerId = req.params.id;
    const skip = Number(req.query.skip) || Number(0);
    const take = Number(req.query.limit) || Number(100);

    const amountWatches = await repo.createQueryBuilder('watchesAmount').select('COUNT(*)', 'amount').where('ownerId = :ownerId', {ownerId: ownerId}).getRawOne();
    
    const watches = await repo.find({
      where: { ownerId: ownerId},
      skip: Number(skip),
      take: Number(take)
    });

    if (watches === undefined || watches.length === 0) {
      APILogger.logger.info(`[GET][/watches/owner/:id]: failed to find any watched tenements with ownerId: ${ownerId}`);
      return res.status(404).send(`No watched tenements with ownerId ${ownerId}`)
    }
    const returnObj = {
      amount: amountWatches.amount,
      watches: watches
    }

    return res.status(200).send(returnObj);

  }catch(error){
    APILogger.logger.info(`[GET][/watchedTenements][ERROR]${error}`);
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

    const token = req.headers.authorization;
    var decoded: any  = jwt_decode(token);
    const tokenPayload = {
      iss: decoded.iss || null,
      sub: decoded.sub || null,
      aud: decoded.aud || null,
      iat: decoded.iat || null,
      exp: decoded.exp || null,
      azp: decoded.azp || null,
      scope: decoded.scope || null
    }


    // The request header will contain the sub (subject) of the JWT
    // We can use this instead of the userId
    const watchedTenement: WatchedTenements = {
      ownerId: tokenPayload.sub,
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

    const token = req.headers.authorization;
    var decoded: any  = jwt_decode(token);
    const tokenPayload = {
      iss: decoded.iss || null,
      sub: decoded.sub || null,
      aud: decoded.aud || null,
      iat: decoded.iat || null,
      exp: decoded.exp || null,
      azp: decoded.azp || null,
      scope: decoded.scope || null
    }

    const watchId = req.body.data.watchId;
    const ownerId = tokenPayload.sub;
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
