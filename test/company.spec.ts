'use strict'

import * as chai from 'chai'
import chaiHttp = require('chai-http')
import 'mocha'
import app from '../src/app'
import user from '../src/model/Company'

chai.use('chaiHttp')

const expect = chai.expect

const company: Company = {
  // Test values
  id: 1,
  companyName: 'akatosh',
  companySize: '1',
  location: 'Dublin',
  contactEmail: 'neil@akatosh.com'
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
