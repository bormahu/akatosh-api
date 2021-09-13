import { NextFunction, Request, Response } from 'express'
import {default as Company} from '../model/Company'

let companies: Array<Company> = []

export let getCompany = (req: Request, res:Response, next: NextFunction) => {
  const companyName = req.body.companyName
  const company = companies.find(obj => obj.companyName === companyName)
  const httpStatusCode = company ? 200 : 404

  return res.status(httpStatusCode).send(company)
}

export let addCompany = (req:Request, res:Response, next: NextFunction) => {
  const company:Company = {
    id: Math.floor(Math.random()*100)+1,
    companyName: req.body.companyName,
    companySize: req.body.companySize,
    location: req.body.location,
    contactEmail: req.body.contactEmail,
  }
  companies.push(company)

  return res.status(201).send(company)
}

export let updateCompany = (req:Request, res:Response, next:NextFunction) => {
   const companyName = req.body.companyName
   const companyIndex = companies.findIndex(item => item.companyName === companyName)

   if(companyIndex === -1){
     return res.status(404).send()
   }
   const company = companies[companyIndex]
   company.id = req.body.id || company.id
   company.companyName = req.body.companyName || company.companyName
   company.companySize = req.body.companySize || company.companySize
   company.location = req.body.location || company.location
   company.contactEmail = req.body.contactEmail || company.contactEmail


   companies[companyIndex] = company

   return res.status(204).send()
}

export let removeCompany = (req:Request, res:Response, next:NextFunction)=>{
  const companyName = req.body.companyName
  const companyIndex = companies.findIndex(item => item.companyName === companyName)

  if(companyIndex === -1){
    return res.status(404).send()
  }
  companies = companies.filter(item => item.companyName !== companyName)

  return res.status(204).send()
}
