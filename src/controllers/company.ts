import { NextFunction, Request, Response } from 'express'
import { Company } from '../entities/Company'
import { connect } from '../database';
import { APILogger } from '../utils/logger';
import { v4 as uuidv4 } from 'uuid';


export let getCompany = async (req: Request, res:Response, next: NextFunction) => {
  try{
    const connection = await connect();

    const repo = await connection.getRepository(Company);

    const company_name = req.body.company_name;
    APILogger.logger.info(`[GET][/company]${company_name}`);

    const company = await repo.findOne({where: {company_name: company_name}});

    if(company === undefined){
      APILogger.logger.info(`[GET][/company]: failed to find company: ${company_name}`);
      return res.status(404).send(`${company_name} does not exist`);
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
      company_id: uuidv4(),
      company_name: req.body.company_name,
      company_size: req.body.company_size,
      company_location: req.body.company_location,
      company_account_creation_date: new Date(),
      active_user_accounts: 1
    }
    APILogger.logger.info(`[POST][/company]${company.company_name}`);

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

    const company_name = req.body.company_name;
    const company = await repo.findOne({where: { company_name: company_name }});

    if(company === undefined){
      APILogger.logger.info(`[PATCH][/company]: failed to find company: ${company_name}`);
      return res.status(404).send(`Company: ${company_name} does not exist`)
    }
    APILogger.logger.info(`[PATCH][/company]${company.company_name}`);
    company.company_name = req.body.company_name || company.company_name;
    company.company_size = req.body.company_size || company.company_size;
    company.company_location = req.body.company_location || company.company_location;

    await repo.save(company)
    return res.status(204).send(`${company.company_name} details updated`)

  }catch(error){
    APILogger.logger.info(`[PATCH][/company][ERROR]${error}`);
    return res.status(500).send(error);
  }
}

export let removeCompany = async (req:Request, res:Response, next:NextFunction)=>{
  try{
    const connection = await connect();
    const repo = await connection.getRepository(Company);

    const company_name = req.body.company_name;
    const company = await repo.findOne({where: {company_name: company_name}})

    if(company === undefined){
      APILogger.logger.info(`[DELETE][/company]: failed to find: ${company_name}`);
      return res.status(404).send(`Company: ${company_name} does not exist`);
    }

    await repo.delete({company_name: company_name});
    APILogger.logger.info(`[DELETE][/users]${company_name}`);

    return res.status(204).send(`Company ${company_name} has been deleted`)

  }catch (error){
    APILogger.logger.info(`[DELETE][/company][ERROR]${error}`);
    return res.status(500).send(error);
  }
}
