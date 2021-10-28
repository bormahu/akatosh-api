'use strict'

import * as chai from 'chai'

import 'mocha'

import { v4 as uuidv4 } from 'uuid';

import app from '../src/app'
import { GlobalTenements } from '../src/entities/GlobalTenements';
import  { WatchedTenements } from '../src/entities/WatchedTenements'
import {APILogger} from '../src/utils/logger';


import chaiHttp = require('chai-http')

chai.use(chaiHttp)

const expect = chai.expect

const tenementId = '001a186c-da8a-5b4d-b8bd-71c9dd7db1d6'

const payload = {
    data: {
        ownerId: '4534a29c-916f-477b-af50-775a9b16fee8',
        tenementId: '001a186c-da8a-5b4d-b8bd-71c9dd7db1d6',
    }
}

const watch: WatchedTenements  = {
  // Generic values for testing
  ownerId: '4534a29c-916f-477b-af50-775a9b16fee8',
  tenement: new GlobalTenements,
  watchId: uuidv4(),
  watchLastUpdate: new Date(),
  watchStartDate: new Date(),
}

describe('watchRoute', () =>{
    before(async () => {
        expect(WatchedTenements.name).to.be.equal('WatchedTenements') 
      })
    it('should respond with a HTTP status 404 because there is no such watch', async()=>{
        return chai
        .request(app)
        .get(`/watch/?ownerID=${watch.ownerId}`)
        .then(res => {
        expect(res.status).to.be.equal(404)
        })
    })
    it('should create a new watch event and retrieve it back', async()=>{
        return chai
        .request(app)
        .post(`/watch`)
        .send(payload)
        .then(res => {
          expect(res.status).to.be.equal(201)
        })
      })
    it('should return the watches belonging to the User', async()=>{
        return chai
        .request(app)
        .get(`/watch/?ownerId=${watch.ownerId}`)
        .then(res => {
          expect(res.status).to.be.equal(200)
        })
      })
})