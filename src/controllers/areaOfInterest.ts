import { NextFunction, Request, Response } from 'express';
import { v4 as uuidv4 }  from 'uuid';
import { connect } from '../database';
import { AreaOfInterest } from '../entities/AreaOfInterest';
import { APILogger } from '../utils/logger';
import jwt_decode from "jwt-decode";

export let getAreaOfInterest = async (req:Request, res: Response, next:NextFunction)=>{
    try{
      const connection = await connect();
      const repo = await connection.getRepository(AreaOfInterest);

      const aoiId = req.params.id;

      const aoi = await repo.findOne({where: {aoiId: aoiId}});
      if(aoi === undefined){
        APILogger.logger.info(`[GET][/areaOfInterest/:id]: failed to find any areaOfInterest with aoiId: ${aoiId}`);
        return res.status(404).send(`No areaOfInterest with id ${aoiId}`)
      }
      return res.status(200).send(aoi);

    }catch(error){
      APILogger.logger.info(`[GET][/areaOfInterest][ERROR]${error}`);
      return res.status(500).send(error);
    }
}
export let getAreasOfInterest = async (req:Request, res: Response, next:NextFunction)=>{
  try{
    const connection = await connect();
    const repo = await connection.getRepository(AreaOfInterest);

    // We may want to do some check internally that a user with correct auth cannot acccess another users resources
    const skip = Number(req.query.skip) || Number(0);
    const take = Number(req.query.limit) || Number(100);

    const areasOfInterest = await repo.find({
      skip: Number(skip),
      take: Number(take)
    });

    if (areasOfInterest === undefined || areasOfInterest.length === 0) {
      APILogger.logger.info(`[GET][/areaOfInterest]: failed to find any areaOfInterest`);
      return res.status(404).send(`Failed to find any areaOfInterest`)
    }
    return res.status(200).send(areasOfInterest);

  }catch(error){
    APILogger.logger.info(`[GET][/areaOfInterest][ERROR]${error}`);
    return res.status(500).send(error);
  }
}

export let getAreasOfInterestByUser = async (req:Request, res: Response, next:NextFunction)=>{
  try{
    const connection = await connect();
    const repo = await connection.getRepository(AreaOfInterest);

    const userId = req.params.id;
    const skip = Number(req.query.skip) || Number(0);
    const limit = Number(req.query.limit) || Number(100);

    const areasOfInterest = await repo.find({
      where: {userId: userId},
      skip: Number(skip),
      take: Number(limit)
    });

    if(areasOfInterest === undefined || areasOfInterest.length === 0){
      APILogger.logger.info(`[GET][/areaOfInterest/:id]: failed to find any areaOfInterest with userId: ${userId}`);
      return res.status(404).send(`No areaOfInterest with id ${userId}`)
    }
    return res.status(200).send(areasOfInterest);

  }catch(error){
    APILogger.logger.info(`[GET][/areaOfInterest][ERROR]${error}`);
    return res.status(500).send(error);
  }
}
  export let addAreaOfInterest = async (req:Request, res: Response, next:NextFunction)=>{
    try{
      const connection = await connect();
      const repo = await connection.getRepository(AreaOfInterest);

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

      const ownerId = tokenPayload.sub;
      
      // Should be provided with the tenmentId and the user_id
      const aoi: AreaOfInterest = {
        aoiArea: req.body.data.aoiArea,
        aoiGeometry: req.body.data.geometry,
        aoiId: uuidv4(),
        aoiJurisdiction: req.body.data.jurisdiction,
        lastUpdate: new Date(),
        ownerId: ownerId,      
        watchStartDate: new Date(),   
      }
      APILogger.logger.info(`[POST][/aoi]${aoi.aoiId}`);
  
      await repo.save(aoi);
  
      return res.status(201).send(aoi)
  
    } catch(error){
      APILogger.logger.info(`[POST][/aoi][ERROR]${error}`);
      return res.status(500).send(error);
    }
  }

  export let updateAreaOfInterest = async (req:Request, res: Response, next:NextFunction)=> {

    try{
      const connection = await connect();
      const repo = connection.getRepository(AreaOfInterest);

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
      const ownerId = tokenPayload.sub;
      const aoiId = req.body.data.aoiId;

      const aoi =  await repo.findOne({where: {
        aoiId: aoiId,
        ownerId: ownerId
      }})
  
      if(aoi === undefined){
        APILogger.logger.info(`[PATCH][/aoi]: failed to find area of interest with ID: ${aoiId} belonging to ${ownerId}`);
        return res.status(404).send(`Area of interest with id ${aoiId} does not exist`);
      }
      APILogger.logger.info(`[PATCH][/aoi]${aoi.aoiId}`);
  
      aoi.lastUpdate = new Date() || aoi.lastUpdate;
  
      await repo.save(aoi)
  
      return res.status(204).send();
  
    }catch(error){
      APILogger.logger.info(`[PATCH][/aoi][ERROR]${error}`);
      return res.status(500).send(error);
    }
  }
  export let removeAreaOfInterest = async (req:Request, res: Response, next:NextFunction)=> {

    try{
      const connection = await connect();
      const repo = connection.getRepository(AreaOfInterest);

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
      const ownerId = tokenPayload.sub;

      const aoiId = req.body.data.aoiId;
      
  
      const aoi = await repo.findOne({where: {
        aoiId: aoiId, 
        ownerId: ownerId
      }});
      if(aoi.ownerId != ownerId){
        APILogger.logger.info(`[DELETE][/aoi]: incorerect user id passed for aoi with id ${aoiId}`);
        return res.status(404).send(`incorrect ownerId passed for aoi with id ${aoiId}`);
      }
      if( aoi === undefined){
        APILogger.logger.info(`[DELETE][/aoi]: failed to find are of interest id: ${aoiId}`);
        return res.status(404).send(`Area of interesr with id ${aoiId} does not exist`);
      }
      await repo.delete(aoi)
      APILogger.logger.info(`[DELETE][/aoi]${aoi.aoiId}`);
      return res.status(204).send(`Area of interest with id of${aoiId} has been deleted`)
  
    }catch(error){
      APILogger.logger.info(`[DELETE][/aoi][ERROR]${error}`);
      return res.status(500).send(error);
    }
  }