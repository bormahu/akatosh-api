'use strict'

import * as bcrypt from 'bcrypt'

import * as chai from 'chai'

import 'mocha'

import { v4 as uuidv4 } from 'uuid';

import app from '../src/app'
import  { User } from '../src/entities/User'
import { APILogger } from '../src/utils/logger';

import chaiHttp = require('chai-http')

chai.use(chaiHttp)

const expect = chai.expect

const user = {
  // Generic values for testing
  email: 'test@test.com',
  firstName: 'test',
  lastName: 'test',
  password: 'test',
  userCompany: 'test',
  userId: uuidv4(),
  userType: 'admin',
  username: 'tester',
}

describe('userRoute', () =>{
  let token;
  before(async () => {
    expect(User.name).to.be.equal('User')
    // Should create some dummy user here to post in to test login
  })
  it('should be able to login', async()=>{
    APILogger.logger.info(`Logging in`)
    return chai
    .request(app)
    .post(`/users/login`)
    .send(user)
    .then(res => {
      expect(res.status).to.be.equal(404)
      token = res.body.token
    })
  })
  it('should respond with a status 404 because there is no user', async()=>{
    return chai
    .request(app)
    .get(`/users/${user.username}`)
    .set('Authorisation', `Bearer ${token}`)
    .then(res => {
      expect(res.status).to.be.equal(404)
    })
  })
  it('should create a new user and retrieve it back', async()=>{
    return chai
    .request(app)
    .post(`/users`)
    .set('Authorisation', `Bearer ${token}`)
    .send(user)
    .then(res => {
      expect(res.status).to.be.equal(201)
    })
  })
  it('should return the user created in the previous post', async()=>{
    return chai
    .request(app)
    .get(`/users/?username=${user.username}`)
    .set('Authorisation', `Bearer ${token}`)
    .then(res => {
      expect(res.status).to.be.equal(200)
      expect(res.body.username).to.be.equal(user.username)
    })
  })
  it('should remove the user added', async()=>{
    return chai
    .request(app)
    .delete(`/users`)
    .set('Authorisation', `Bearer ${token}`)
    .send(user)
    .then(res => {
      expect(res.status).to.be.equal(204)
    })
  })
  it('should respond with a status 404 again as the user has been deleted', async()=>{
    return chai
    .request(app)
    .get(`/users/?username=${user.username}`)
    .set('Authorisation', `Bearer ${token}`)
    .then(res => {
      expect(res.status).to.be.equal(404)
    })
  })
})

