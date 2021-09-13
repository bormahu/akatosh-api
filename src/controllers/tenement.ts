import { NextFunction, Request, Response } from 'express'
import {default as Tenement} from '../model/Tenement'

let tenements: Array<Tenement> = []

export let getTenement = (req:Request, res: Response, next:NextFunction)=> {
  const tenementId = req.body.id
  const tenement = tenements.find(obj => obj.id = tenementId)
  const httpStatusCode = tenement ? 200 : 404

  return res.status(httpStatusCode).send(tenement)
}

export let addTenement = (req:Request, res: Response, next:NextFunction)=>{
  const tenement:Tenement = {
    id: req.body.id,
    license: req.body.license,
    licenseSpecial: req.body.licenseSpecial,
    surveyStatus: req.body.surveyStatus,
    tenementStatus: req.body.tenementStatus,
    dateStarted: req.body.dateStarted,
    dateEnded: req.body.dateEnded,
    dateGranted: req.body.dateGranted,
    primaryTenementHolder: req.body.primaryTenementHolder,
    legalArea: req.body.legalArea,
    area: req.body.area,
  }

  tenements.push(tenement)
  return res.status(201).send(tenement)
}

export let updateTenement = (req:Request, res: Response, next:NextFunction)=> {
  const tenementId = req.body.id
  const tenementIndex = tenements.findIndex(item => item.id === tenementId)

  if(tenementIndex === -1){
    return res.status(404).send()
  }
  const tenement = tenements[tenementIndex]

  tenement.id = req.body.id || tenement.id
  tenement.license = req.body.license || tenement.license
  tenement.licenseSpecial = req.body.licenseSpecial || tenement.licenseSpecial
  tenement.surveyStatus = req.body.surveyStatus || tenement.surveyStatus
  tenement.tenementStatus = req.body.tenementStatus || tenement.tenementStatus
  tenement.dateStarted = req.body.dateStarted || tenement.dateStarted
  tenement.dateEnded = req.body.dateEnded || tenement.dateEnded
  tenement.dateGranted = req.body.dateGranted || tenement.dateGranted
  tenement.primaryTenementHolder = req.body.primaryTenementHolder || tenement.primaryTenementHolder
  tenement.legalArea = req.body.legalArea || tenement.legalArea
  tenement.area = req.body.area || tenement.area

  tenements[tenementIndex] = tenement

  return res.status(204).send()
}
export let removeTenement = (req:Request, res: Response, next:NextFunction)=> {
  const tenementId = req.body.id
  const tenementIndex = tenements.findIndex(item => item.id === tenementId)

  if(tenementIndex === -1){
    return res.status(404).send()
  }

  tenements = tenements.filter(item => item.id !== tenementId)

  return res.status(204).send()
}
export let getLiveTenements = (req:Request, res:Response, next:NextFunction)=> {
  const status = req.query.status
  let liveTenements = tenements

  if(status){
    liveTenements = liveTenements.filter(item => item.tenementStatus === status)
  }
  return res.status(200).send(liveTenements)
}
