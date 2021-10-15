import { NextFunction, Request, Response } from 'express'
import { GlobalTenements } from '../entities/GlobalTenements'
import {APILogger} from '../utils/logger';
import { v4 as uuidv4 } from 'uuid';
import { connect } from '../database';
import util from 'util';

export let getTenement = async (req:Request, res: Response, next:NextFunction)=> {
    try{
        const connection = await connect();
        const repo = await connection.getRepository(GlobalTenements);
  
        const tenement_id = req.query.tenement_id
  
        // Have to grab the tenements with the correct parent owner
        const tenements = await repo.findOne({where: {tenement_id: tenement_id}})
        APILogger.logger.info(`[GET][/globaltenements]:${tenements}`);
    
        if(tenements === undefined){
            APILogger.logger.info(`[GET][/globaltenements]: failed to find any tenements with owner_id: ${tenement_id}`);
            return res.status(404).send(`No watched tenements with owner_id ${tenement_id}`)
        }
        APILogger.logger.info(`[GET][/globaltenements]: Returned tenements to ${tenement_id}`);
        return res.status(200).send(tenements);
  
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
          tenement_id: uuidv4(),
          licence: req.body.licence,
          licence_special: req.body.licence_special,
          survey_status: req.body.survey_status,
          tenement_status: req.body.tenement_status,
          licence_start_date: new Date(),
          licence_end_date: new Date(),
          licence_grant_date: new Date(),
          primary_tenement_holder: req.body.primary_tenement_holder,
          tenement_area: req.body.tenement_area,
        //   This will need some work
          tenement_geometry: req.body.tenement_geometry
      }
      APILogger.logger.info(`[POST][/watched]${tenement.tenement_id}`);
  
      await repo.save(tenement);
  
      return res.status(201).send(tenement)
  
    } catch(error){
      APILogger.logger.info(`[POST][/watched][ERROR]${error}`);
      return res.status(500).send(error);
    }
  }
