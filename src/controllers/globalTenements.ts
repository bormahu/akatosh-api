import { NextFunction, Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';

import { connect } from '../database';
import { GlobalTenements } from '../entities/GlobalTenements';
import {APILogger} from '../utils/logger';
import jwt_decode from "jwt-decode";

export let getTenements = async (req:Request, res: Response, next:NextFunction)=> {
    try{
        const connection = await connect();
        const repo = await connection.getRepository(GlobalTenements);

        const skip = Number(req.query.skip) || Number(0);
        const take = Number(req.query.limit) || Number(100);

        // Cycle through the queries and add them to a whereClause object as long as they are not skip or limit
        let whereClause = {};
        for (const key in req.query) {
            if (req.query.hasOwnProperty(key) && key !== 'skip' && key !== 'limit') {
                const element = req.query[key];
                whereClause[key] = element;
            }
        }
        const amount = await repo.createQueryBuilder('tenementsAmount').select('COUNT(*)', 'amount').getRawOne();

        const tenements = await repo.find({
            where: whereClause,
            skip: Number(skip),
            take: Number(take)
        });

        if (tenements === undefined || tenements.length === 0) {
            APILogger.logger.info(`[GET][/tenements]: failed to find any tenements`);
            return res.status(404).send(`Failed to find any tenements`)
        }
        return res.status(200).send(tenements);

    }catch(error){
      APILogger.logger.info(`[GET][/globaltenements][ERROR]${error}`);
      return res.status(500).send(error);
    }
  }
export let getTenement = async (req:Request, res: Response, next:NextFunction)=>{
  try{
    const connection = await connect();
    const repo = await connection.getRepository(GlobalTenements);

    const tenementId = req.params.id;
    const tenement = await repo.findOne({where: {tenementId: tenementId}});
    
    if(tenement === undefined){
      APILogger.logger.info(`[GET][/tenement/:id]: failed to find any tenement with tenementId: ${tenementId}`);
      return res.status(404).send(`No tenement with id ${tenementId}`)
    }
    return res.status(200).send(tenement);
    }catch(error){
      APILogger.logger.info(`[GET][/globaltenements][ERROR]${error}`);
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
