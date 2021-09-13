'use strict'

import * as chai from 'chai'
import chaiHttp = require('chai-http')
import 'mocha'
import app from '../src/app'
import user from '../src/model/User'

chai.use(chaiHttp)

const expect = chai.expect

const user: User = {
  // Generic values for testing
  id: Math.floor(Math.random()* 100)+1,
  username: 'Neil',
  firstName: 'Neil',
  secondName: 'Shevlin',
  email: 'neil@akatosh.io',
  password: 'password',
  userCompany: 'akatosh'
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
})
