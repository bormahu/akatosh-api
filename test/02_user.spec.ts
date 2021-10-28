'use strict'

import * as chai from 'chai'

import 'mocha'

import { v4 as uuidv4 } from 'uuid';

import app from '../src/app'
import  { User } from '../src/entities/User'

import chaiHttp = require('chai-http')

chai.use(chaiHttp)

const expect = chai.expect

const user = {
  // Generic values for testing
  email: 'test@tests.test',
  firstName: 'TEST_USER',
  lastName: 'TEST_USER',
  password: 'passwordTEST',
  userCompany: 'TEST COMPANY',
  userId: uuidv4(),
  userType: 'admin',
  username: 'test_username',
}

describe('userRoute', () =>{
  before(async () => {
    expect(User.name).to.be.equal('User') 
  })
  it('should respond with a status 404 because there is no user', async()=>{
    return chai
    .request(app)
    .get(`/users/${user.username}`)
    .then(res => {
      expect(res.status).to.be.equal(404)
    })
  })
  it('should create a new user and retrieve it back', async()=>{
    return chai
    .request(app)
    .post(`/users`)
    .send(user)
    .then(res => {
      expect(res.status).to.be.equal(201)
    })
  })
  it('should return the user created in the previous post', async()=>{
    return chai
    .request(app)
    .get(`/users/?username=${user.username}`)
    .then(res => {
      expect(res.status).to.be.equal(200)
      expect(res.body.username).to.be.equal(user.username)
    })
  })
  it('should remove the user added', async()=>{
    return chai
    .request(app)
    .delete(`/users`)
    .send(user)
    .then(res => {
      expect(res.status).to.be.equal(204)
    })
  })
  it('should respond with a status 404 again as the user has been deleted', async()=>{
    return chai
    .request(app)
    .get(`/users/?username=${user.username}`)
    .then(res => {
      expect(res.status).to.be.equal(404)
    })
  })
})

