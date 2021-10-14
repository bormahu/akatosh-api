'use strict'

import * as chai from 'chai'
import chaiHttp = require('chai-http')
import 'mocha'
import app from '../src/app'
import { Company } from '../src/entities/Company'

chai.use(chaiHttp)

const expect = chai.expect

const company: Company = {
  // Test values
  company_id: "d3737",
  company_name: 'akatosh',
  company_size: '1',
  company_location: 'Dublin',
  // company_signup_user_id: '2763737',
  company_account_creation_date: new Date('1998-02-12T03:24:00'),
  active_user_accounts: 1,
}

describe('userRoute', ()=>{
  it('should respond with a status 404 because there is no such Company', async ()=>{
    return chai
    .request(app)
    .get(`companies/${company.company_name}`)
    .then(res =>{
      expect(res.status).to.be.equal(404)
    })
  })
})
