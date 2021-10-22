'use strict'

import * as chai from 'chai'

import 'mocha'

import app from '../src/app'
import  { GlobalTenements } from '../src/entities/GlobalTenements'

import chaiHttp = require('chai-http')

chai.use(chaiHttp)

const expect = chai.expect

const tenement: GlobalTenements  = {
  // Generic values for testing
  licence: 'exploration',
  licenceEndDate: new Date('1998-02-12T03:24:00'),
  licenceGrantDate: new Date('1998-02-12T03:24:00'),
  licenceSpecial: null,
  licenceStartDate: new Date('1998-02-12T03:24:00'),
  primaryTenementHolder: 'Akatosh',
  surveyStatus: 'surveyed',
  tenementArea: 40,
  tenementGeometry: "POLYGON((53.36703218781792 -6.251012371881005,53.36139422715158 -6.2123788667433075,53.32252326665098 -6.247578282535436,53.32939749245477 -6.273849066029075,53.36703218781792 -6.251012371881005))",
  tenementId: '00206cd8-512f-5777-a970-fcb78852f651',
  tenementStatus: 'live',
  watchedTenements: []
}

describe('tenementRoute', () =>{
  it('should respond with a HTTP status 404 because there is no such tenement', async()=>{
    return chai
    .request(app)
    .get(`/tenement/${tenement.tenementId}`)
    .then(res => {
      expect(res.status).to.be.equal(404)
    })
  })
})