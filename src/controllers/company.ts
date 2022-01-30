import { NextFunction, Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';

import { connect } from '../database';
import { Company } from '../entities/Company';
import { APILogger } from '../utils/logger';

export let getCompany = async (req: Request, res:Response, next: NextFunction) => {
  try{
    const connection = await connect();

    const repo = await connection.getRepository(Company);

    const companyName = req.query.companyName;
    APILogger.logger.info(`[GET][/company][request query] ${companyName}`);

    const company = await repo.findOne({where: {companyName: companyName}});

    if(company === undefined){
      APILogger.logger.info(`[GET][/company]: failed to find company: ${companyName}`);
      return res.status(404).send(`${companyName} does not exist`);
    }
    return res.status(200).send(company);

  } catch(error){
    APILogger.logger.info(`[GET][/company][ERROR]${error}`);
    return res.status(500).send(error);
  }
}

export let addCompany = async (req:Request, res:Response, next: NextFunction) => {
  try{
    const connection = await connect();
    const repo = await connection.getRepository(Company)

    const company: Company = {
      activeUserAccounts: 1,
      companyAccountCreationDate: new Date(),
      companyId: uuidv4(),
      companyLocation: req.body.data.companyLocation,
      companyName: req.body.data.companyName,
      companySize: req.body.data.companySize,
    }
    APILogger.logger.info(`[POST][/company]${company.companyName}`);

    await repo.save(company);

    return res.status(201).send(company);
  }catch(error){
    APILogger.logger.info(`[POST][/company][ERROR]${error}`);
    return res.status(500).send(error);
  }
}

export let updateCompany = async (req:Request, res:Response, next:NextFunction) => {
  try{
    const connection = await connect();
    const repo = await connection.getRepository(Company);

    const companyName = req.body.data.companyName;
    const company = await repo.findOne({where: { companyName: companyName }});

    if(company === undefined){
      APILogger.logger.info(`[PATCH][/company]: failed to find company: ${companyName}`);
      return res.status(404).send(`Company: ${companyName} does not exist`)
    }
    APILogger.logger.info(`[PATCH][/company]${company.companyName}`);
    company.companyName = req.body.data.companyName || company.companyName;
    company.companySize = req.body.data.companySize || company.companySize;
    company.companyLocation = req.body.data.companyLocation || company.companyLocation;

    await repo.save(company)
    return res.status(204).send(`${company.companyName} details updated`)

  }catch(error){
    APILogger.logger.info(`[PATCH][/company][ERROR]${error}`);
    return res.status(500).send(error);
  }
}

export let removeCompany = async (req:Request, res:Response, next:NextFunction)=>{
  try{
    const connection = await connect();
    const repo = await connection.getRepository(Company);

    const companyName = req.body.data.companyName;
    const company = await repo.findOne({where: {companyName: companyName}})

    if(company === undefined){
      APILogger.logger.info(`[DELETE][/company]: failed to find: ${companyName}`);
      return res.status(404).send(`Company: ${companyName} does not exist`);
    }

    await repo.delete({companyName: companyName});
    APILogger.logger.info(`[DELETE][/users]${companyName}`);

    return res.status(204).send(`Company ${companyName} has been deleted`)

  }catch (error){
    APILogger.logger.info(`[DELETE][/company][ERROR]${error}`);
    return res.status(500).send(error);
  }
}
