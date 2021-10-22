'use strict'

import * as chai from 'chai'

import 'mocha'

import app from '../src/app'
import { Company } from '../src/entities/Company'

import chaiHttp = require('chai-http')

chai.use(chaiHttp)

const expect = chai.expect

const company: Company = {
  // Test values
  activeUserAccounts: 1,
  companyAccountCreationDate: new Date('1998-02-12T03:24:00'),
  companyId: "d3737",
  companyLocation: 'Dublin',
  companyName: 'akatosh',
  companySize: '1',
}

describe('userRoute', ()=>{
  it('should respond with a status 404 because there is no such Company', async ()=>{
    return chai
    .request(app)
    .get(`companies/${company.companyName}`)
    .then(res =>{
      expect(res.status).to.be.equal(404)
    })
  })
})
