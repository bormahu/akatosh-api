'use strict'

import * as chai from 'chai'

import 'mocha'

import { v4 as uuidv4 } from 'uuid';

import app from '../src/app'
import { Company } from '../src/entities/Company'
import { User } from '../src/entities/User'

import chaiHttp = require('chai-http')

chai.use(chaiHttp)

const expect = chai.expect

const company = {
  data: {
    companyLocation: 'Dublin',
    companyName: 'Akatosh',
    companySize: '1',
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

describe('companyRoute', ()=>{
  let token;
  before(async () => {
    expect(Company.name).to.be.equal('Company') 
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
  it('should respond with a status 404 because company does not exist', async ()=>{
    return chai
    .request(app)
    .get(`/companies/?companyName=${company.data.companyName}`)
    .set('Authorization', `Bearer ${token}`)
    .then(res =>{
      expect(res.status).to.be.equal(404)
    })
  })
  it('should create a new company and retrieve it back', async()=>{
    return chai
    .request(app)
    .post(`/companies`)
    .set('Authorization', `Bearer ${token}`)
    .send(company)
    .then(res => {
      expect(res.status).to.be.equal(201)
    })
  })
  it('should return the company created in the previous post', async()=>{
    return chai
    .request(app)
    .get(`/companies/?companyName=${company.data.companyName}`)
    .set('Authorization', `Bearer ${token}`)
    .then(res => {
      expect(res.status).to.be.equal(200)
      expect(res.body.companyName).to.be.equal(company.data.companyName)
    })
  })
  it('should return a 204 after succesfully updating the company', async()=>{
    return chai
    .request(app)
    .patch(`/companies`)
    .set('Authorization', `Bearer ${token}`)
    .send(company)
    .then(res => {
      expect(res.status).to.be.equal(204)
    })
  })
  it('should remove the company added', async()=>{
    return chai
    .request(app)
    .delete(`/companies`)
    .set('Authorization', `Bearer ${token}`)
    .send(company)
    .then(res => {
      expect(res.status).to.be.equal(204)
    })
  })
  it('should respond with a status 404 again as the company has been deleted', async()=>{
    return chai
    .request(app)
    .get(`/users/?companyName=${company.data.companyName}`)
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
