import { NextFunction, Request, Response } from 'express'
import {default as User} from '../model/User'
import {APILogger} from '../utils/logger'

let users: Array<User> = []

export let getUser = (req: Request, res:Response, next: NextFunction) => {
  const username = req.params.username
  APILogger.logger.info(`[GET][/users]${username}`)
  const user = users.find(obj => obj.username === username)
  const httpStatusCode = user ? 200 : 404
  

  return res.status(httpStatusCode).send(user)
}

export let addUser = (req:Request, res:Response, next:NextFunction) => {
  const user:User = {
    id: Math.floor(Math.random()*100)+1,
    username: req.body.username,
    firstName: req.body.firstName,
    secondName: req.body.secondName,
    email: req.body.email,
    password: req.body.password,
    userCompany: req.body.userCompany,
    userType: req.body.userType
  }
  APILogger.logger.info(`[POST][/users]${user.username}`)
  users.push(user)
  return res.status(201).send(user)
}

export let updateUser = (req:Request, res:Response, next: NextFunction) => {
  const username = req.body.username
  const userIndex = users.findIndex(item => item.username === username)

  if(userIndex === -1){
    return res.status(404).send()
  }
  const user = users[userIndex]
  user.username = req.body.username || user.username
  user.firstName = req.body.firstName || user.firstName
  user.secondName = req.body.firstname || user.secondName
  user.email = req.body.email || user.email
  user.password = req.body.password || user.password
  user.userCompany = req.body.userCompany || user.userCompany
  user.userType = req.body.userType|| user.userType

  users[userIndex] = user

  return res.status(204).send()
}

export let removeUser = (req:Request, res: Response, next: NextFunction) => {
  const username = req.body.username
  const userIndex  = users.findIndex(item => item.username === username)

  if(userIndex === -1){
    return res.status(404).send()
  }
  users = users.filter(item => item.username !== username)

  return res.status(204).send()
}
