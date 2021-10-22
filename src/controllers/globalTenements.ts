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
