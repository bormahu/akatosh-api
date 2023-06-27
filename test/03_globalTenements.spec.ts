'use strict'

import * as chai from 'chai'

import 'mocha'

import { v4 as uuidv4 } from 'uuid';

import app from '../src/app'
import  { GlobalTenements } from '../src/entities/GlobalTenements'
import { User } from '../src/entities/User'

import chaiHttp = require('chai-http')

chai.use(chaiHttp)

const expect = chai.expect

const tenement = {
  // Generic values for testing
  data: {
    
    licence: 'TEST',
    licenceSpecial: null,
    primaryTenementHolder: 'TEST',
    surveyStatus: 'TEST',
    tenementArea: 40,
    tenementGeometry: "POLYGON((53.36703218781792 -6.251012371881005,53.36139422715158 -6.2123788667433075,53.32252326665098 -6.247578282535436,53.32939749245477 -6.273849066029075,53.36703218781792 -6.251012371881005))",
    tenementId: null,
    tenementStatus: 'TEST',
    watchedTenements: []
  }
  
}

const user = {
  // Generic values for testing
  data : {
    email: 'test@test.com',
    firstName: 'test',
    lastName: 'test',
    password: 'test',
    userCompany: 'test',
    userType: 'admin',
    username: 'tester',
  }
}

describe('tenementRoute', () =>{
  let token;
  before(async () => {
    expect(GlobalTenements.name).to.be.equal('GlobalTenements')
    expect(User.name).to.be.equal('User')
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
  it('should return a 200 because the user now exists and can now login', async()=>{
    return chai
    .request(app)
    .post(`/users/login`)
    .send(user)
    .then(res => {
      expect(res.status).to.be.equal(200)
      token = res.body.token
    })
  })
  it('should respond with a HTTP status 404 because there is no such tenement', async()=>{
    return chai
    .request(app)
    .get(`/tenement/?tenementId=31408b32-9e6a-4933-97d3-338f81b551ed`)
    .set('Authorization', `Bearer ${token}`)
    .then(res => {
      expect(res.status).to.be.equal(404)
    })
  })
  it('should create a new tenement and retrieve it back', async()=>{
    return chai
    .request(app)
    .post(`/tenement`)
    .set('Authorization', `Bearer ${token}`)
    .send(tenement)
    .then(res => {
      expect(res.status).to.be.equal(201)
      tenement.data.tenementId = res.body.tenementId
    })
  })
  it('should return the tenement created in the previous post', async()=>{
    return chai
    .request(app)
    .get(`/tenement/?tenementId=${tenement.data.tenementId}`)
    .set('Authorization', `Bearer ${token}`)
    .then(res => {
      expect(res.status).to.be.equal(200)
    })
  })
  it('should return a 204 after succesfully updating the tenement', async()=>{
    tenement.data.licence = 'exploration licence';
    return chai
    .request(app)
    .patch(`/tenement`)
    .set('Authorization', `Bearer ${token}`)
    .send(tenement)
    .then(res => {
      expect(res.status).to.be.equal(204)
    })
  })
  it('should remove the tenement added', async()=>{
    return chai
    .request(app)
    .delete(`/tenement`)
    .send(tenement)
    .set('Authorization', `Bearer ${token}`)
    .then(res => {
      expect(res.status).to.be.equal(204)
    })
  })
  it('should return a 404 because the tenement does not exist', async()=>{
    return chai
    .request(app)
    .get(`/tenement/?tenementId=${tenement.data.tenementId}`)
    .set('Authorization', `Bearer ${token}`)
    .then(res => {
      expect(res.status).to.be.equal(404)
    })
  })
  it('should remove the user added', async()=>{
    return chai
    .request(app)
    .delete(`/users`)
    .set('Authorization', `Bearer ${token}`)
    .send(user)
    .then(res => {
      expect(res.status).to.be.equal(204)
    })
  })

})