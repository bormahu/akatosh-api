'use strict'

import * as chai from 'chai'

import 'mocha'

import { v4 as uuidv4 } from 'uuid';

import app from '../src/app'
import { Company } from '../src/entities/Company'

import chaiHttp = require('chai-http')

chai.use(chaiHttp)

const expect = chai.expect

const company: Company = {
  // Test values
  activeUserAccounts: 1,
  companyAccountCreationDate: new Date(),
  companyId: uuidv4(),
  companyLocation: 'Dublin',
  companyName: 'akatosh',
  companySize: '1',
}

describe('companyRoute', ()=>{
  before(async () => {
    expect(Company.name).to.be.equal('Company') 
  })
  it('should respond with a status 404 because there is no such Company', async ()=>{
    return chai
    .request(app)
    .get(`/companies/?companyName=${company.companyName}`)
    .then(res =>{
      expect(res.status).to.be.equal(404)
    })
  })
  it('should create a new company and retrieve it back', async()=>{
    return chai
    .request(app)
    .post(`/companies`)
    .send(company)
    .then(res => {
      expect(res.status).to.be.equal(201)
    })
  })
  it('should return the company created in the previous post', async()=>{
    return chai
    .request(app)
    .get(`/companies/?companyName=${company.companyName}`)
    .then(res => {
      expect(res.status).to.be.equal(200)
      expect(res.body.companyName).to.be.equal(company.companyName)
    })
  })
  it('should remove the company added', async()=>{
    return chai
    .request(app)
    .delete(`/companies`)
    .send(company)
    .then(res => {
      expect(res.status).to.be.equal(204)
    })
  })
  it('should respond with a status 404 again as the company has been deleted', async()=>{
    return chai
    .request(app)
    .get(`/users/?companyName=${company.companyName}`)
    .then(res => {
      expect(res.status).to.be.equal(404)
    })
  })
})
