import { NextFunction, Request, Response } from 'express'
import { AreaOfInterest } from '../entities/AreaOfInterest'
import {APILogger} from '../utils/logger';
import { v4 as uuidv4 } from 'uuid';
import { connect } from '../database';

export let getAreasOfInterest = async (req:Request, res: Response, next:NextFunction)=> {
    try{
        const connection = await connect();
        const repo = await connection.getRepository(AreaOfInterest);
  
        const owner_id = req.query.owner_id
  
        // Have to grab the tenements with the correct parent owner
        const aoi = await repo.find({where: {owner_id: owner_id}})
        APILogger.logger.info(`[GET][/aoi]:${aoi}`);
    
        if(aoi === undefined){
            APILogger.logger.info(`[GET][/aoi]: failed to find any tenements with owner_id: ${owner_id}`);
            return res.status(404).send(`No watched tenements with owner_id ${owner_id}`)
        }
        APILogger.logger.info(`[GET][/aoi]: Returned aoi to ${owner_id}`);
        return res.status(200).send(aoi);
  
    }catch(error){
      APILogger.logger.info(`[GET][/aoi][ERROR]${error}`);
      return res.status(500).send(error);
    }
  }

  export let addAreaOfInterest = async (req:Request, res: Response, next:NextFunction)=>{
    try{
      const connection = await connect();
      const repo = await connection.getRepository(AreaOfInterest);
  
      // Should be provided with the tenmentId and the user_id
      const aoi: AreaOfInterest = {
            aoi_id: uuidv4(),
            owner_id: req.body.data.owner_id,
            creation_date: new Date(),
            last_update: new Date(),
            jurisdiction: req.body.data.jurisdiction,
            area: req.body.data.area,
            geometry: req.body.data.geometry
      }
      APILogger.logger.info(`[POST][/aoi]${aoi.aoi_id}`);
  
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
  
      const aoi_id = req.body.data.aoi_id;
      const owner_id = req.body.data.owner_id;
      const aoi =  await repo.findOne({where: {
        aoi_id: aoi_id,
        owner_id: owner_id
      }})
  
      if(aoi === undefined){
        APILogger.logger.info(`[PATCH][/aoi]: failed to find area of interest with ID: ${aoi_id} belonging to ${owner_id}`);
        return res.status(404).send(`Area of interest with id ${aoi_id} does not exist`);
      }
      APILogger.logger.info(`[PATCH][/aoi]${aoi.aoi_id}`);
  
      aoi.last_update = new Date() || aoi.last_update;
  
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
  
      const aoi_id = req.body.data.aoi_id;
  
      const aoi = await repo.findOne({where: {aoi_id: aoi_id}});
  
      if( aoi === undefined){
        APILogger.logger.info(`[DELETE][/aoi]: failed to find are of interest id: ${aoi_id}`);
        return res.status(404).send(`Area of interesr with id ${aoi_id} does not exist`);
      }
      await repo.delete(aoi)
      APILogger.logger.info(`[DELETE][/aoi]${aoi.aoi_id}`);
      return res.status(204).send(`Area of interest with id of${aoi_id} has been deleted`)
  
    }catch(error){
      APILogger.logger.info(`[DELETE][/aoi][ERROR]${error}`);
      return res.status(500).send(error);
    }
  }