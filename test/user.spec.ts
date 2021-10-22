'use strict'

import * as chai from 'chai'

import 'mocha'

import app from '../src/app'
import  { User } from '../src/entities/User'

import chaiHttp = require('chai-http')

chai.use(chaiHttp)

const expect = chai.expect

const user: User = {
  // Generic values for testing
  accountCreation: new Date('1998-02-12T03:24:00'),
  accountVerified: new Date('1998-02-12T03:24:00'),
  email: 'neil@akatosh.io',
  firstName: 'Neil',
  lastName: 'Shevlin',
  latestSignin: new Date('1998-02-12T03:24:00'),
  password: 'password',
  userCompany: 'akatosh',
  userId: '1',
  userType: 'type',
  username: 'Neil',
  verified: true,
}

describe('userRoute', () =>{
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
      expect(res.body.userId).to.be.equal(user.userId)
      user.userId = res.body.userId
    })
  })
  it('should return the order created in the previous post', async()=>{
    return chai
    .request(app)
    .get(`/users/userId?${user.userId}`)
    .then(res => {
      expect(res.status).to.be.equal(200)
      expect(res.body.id).to.be.equal(user.userId)
    })
  })
})

