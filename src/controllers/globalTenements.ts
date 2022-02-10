import { NextFunction, Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';

import { connect } from '../database';
import { GlobalTenements } from '../entities/GlobalTenements';
import {APILogger} from '../utils/logger';

export let getTenement = async (req:Request, res: Response, next:NextFunction)=> {
    try{
        const connection = await connect();
        const repo = await connection.getRepository(GlobalTenements);
  
        const tenementId = req.query.tenementId
        // Have to grab the tenements with the correct parent owner
        const tenement = await repo.findOne({where: {tenementId: tenementId}})
        APILogger.logger.info(`[GET][/globaltenements]:${tenementId}`);
    
        if(tenement === undefined){
            APILogger.logger.info(`[GET][/globaltenements]: failed to find any tenements with owner_id: ${tenementId}`);
            return res.status(404).send(`No watched tenements with tenementId ${tenementId}`)
        }
        APILogger.logger.info(`[GET][/globaltenements]: Returned tenements to ${tenementId}`);
        return res.status(200).send(tenement);
  
    }catch(error){
      APILogger.logger.info(`[GET][/globaltenements][ERROR]${error}`);
      return res.status(500).send(error);
    }
  }
  export let getTenements = async (req:Request, res: Response, next:NextFunction) =>{

    try{
      const connection = await connect();
      const repo = await connection.getRepository(GlobalTenements);

      const offset = req.query.offset;
      const limit = req.query.limit;

      // find the tenements with an offset and a limit in typeorm 
      const tenements = await repo.find({
        skip: Number(offset),
        take: Number(limit)
      });
      APILogger.logger.info(`[GET][/paginatedTenements]: Getting values from ${offset} to ${limit}`);

      if(tenements ===undefined || tenements.length === 0){
        APILogger.logger.info(`[GET][/paginatedTenements]: No tenements found`);
        return res.status(404).send(`No tenements found`);
      }
      APILogger.logger.info(`[GET][/paginatedTenements]: Returned tenements to user from ${offset} to ${limit}`);
      return res.status(200).send(tenements);

    }catch (error) {
        APILogger.logger.info(`[GET][/paginatedTenements][ERROR]${error}`);
        return res.status(500).send(error);
      } 
  }
  export let updateGlobalTenement = async (req:Request, res: Response, next:NextFunction)=>{
    // route to update a tenement
    try{
      const connecton = await connect();
      const repo = await connecton.getRepository(GlobalTenements);

      const tenementId = req.body.data.tenementId;
      const tenement = await repo.findOne({where: {tenementId: tenementId}});
      if(tenement === undefined){
        APILogger.logger.info(`[PATCH][/globaltenements]: failed to find any tenements with tenementId: ${tenementId}`);
        return res.status(404).send(`No tenements with tenementId ${tenementId}`)
      }
      APILogger.logger.info(`[PATCH][/globaltenements]: updating tenement ${tenementId}`);
      tenement.licence = req.body.data.licence || tenement.licence;
      tenement.primaryTenementHolder = req.body.data.primaryTenementHolder || tenement.primaryTenementHolder;
      tenement.surveyStatus = req.body.data.surveyStatus || tenement.surveyStatus;
      tenement.tenementStatus = req.body.data.tenementStatus || tenement.tenementStatus;

    


      await repo.save(tenement);
      return res.status(204).send();
      


    }catch(error){
      APILogger.logger.info(`[PATCH][/globaltenements][ERROR]${error}`);
      return res.status(500).send(error);
    }
  }

  export let addGlobalTenement = async (req:Request, res: Response, next:NextFunction)=>{
    try{
      const connection = await connect();
      const repo = await connection.getRepository(GlobalTenements);
  
      // Should be provided with the tenmentId and the user_id
      const tenement: GlobalTenements = {
          licence: req.body.data.licence,
          licenceEndDate: new Date(),
          licenceGrantDate: new Date(),
          licenceSpecial: req.body.data.licenceSpecial,
          licenceStartDate: new Date(),
          primaryTenementHolder: req.body.data.primaryTenementHolder,
          surveyStatus: req.body.data.surveyStatus,
          tenementArea: req.body.data.tenementArea,
          tenementGeometry: req.body.data.tenementGeometry,
          tenementId: uuidv4(),
          tenementStatus: req.body.data.tenementStatus,
          watchedTenements: []
      }
      APILogger.logger.info(`[POST][/watched]${tenement.tenementId}`);
  
      await repo.save(tenement);
  
      return res.status(201).send(tenement)
  
    } catch(error){
      APILogger.logger.info(`[POST][/watched][ERROR]${error}`);
      return res.status(500).send(error);
    }
  }

  export let removeGlobalTenement = async (req:Request, res: Response, next:NextFunction)=>{
    try{
      const connection = await connect();
      const repo = await connection.getRepository(GlobalTenements);
  
      const tenementId = req.body.data.tenementId;
      const tenement = await repo.findOne({where: {tenementId: tenementId}});
      if(tenement === undefined){
        APILogger.logger.info(`[DELETE][/globaltenements]: failed to find any tenements with tenementId: ${tenementId}`);
        return res.status(404).send(`No tenements with tenementId ${tenementId}`)
      }
      APILogger.logger.info(`[DELETE][/globaltenements]: deleting tenement ${tenementId}`);
      await repo.remove(tenement);
  
      return res.status(204).send(tenement);
  
    } catch(error){
      APILogger.logger.info(`[DELETE][/globaltenements][ERROR]${error}`);
      return res.status(500).send(error);
    }
  }
