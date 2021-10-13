'use strict'

import * as chai from 'chai'
import chaiHttp = require('chai-http')
import 'mocha'
import app from '../src/app'
import  { User } from '../src/entities/User'

chai.use(chaiHttp)

const expect = chai.expect

const user: User = {
  // Generic values for testing
  user_id: '373737',
  user_name: 'Neil',
  first_name: 'Neil',
  last_name: 'Shevlin',
  email: 'neil@akatosh.io',
  password: 'password',
  user_company: 'akatosh',
  user_type: 'type',
  verified: true,
  account_creation: new Date('1998-02-12T03:24:00'),
  account_verified: new Date('1998-02-12T03:24:00'),
  latest_signin: new Date('1998-02-12T03:24:00'),
}

describe('userRoute', () =>{
  it('should respond with a status 404 because there is no user', async()=>{
    return chai
    .request(app)
    .get(`/users/${user.user_name}`)
    .then(res => {
      expect(res.status).to.be.equal(404)
    })
  })
})
