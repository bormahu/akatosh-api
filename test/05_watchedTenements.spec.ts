'use strict'

import * as chai from 'chai'

import 'mocha'

import { v4 as uuidv4 } from 'uuid';

import app from '../src/app'
import { GlobalTenements } from '../src/entities/GlobalTenements';
import { User } from '../src/entities/User';
import  { WatchedTenements } from '../src/entities/WatchedTenements';

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
const watch = {
  // Generic values for testing
  data : {
    ownerId: '4534a29c-916f-477b-af50-775a9b16fee8',
    watchId: '001a186c-da8a-5b4d-b8bd-71c9dd7db1d6',
  }
}

describe('watchRoute', () =>{
  let token;
    before(async () => {
        expect(WatchedTenements.name).to.be.equal('WatchedTenements') 
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
    it('should respond with a HTTP status 404 because there is no such watch', async()=>{
      return chai
      .request(app)
      .get(`/watch/?watchId=31408b32-9e6a-4933-97d3-338f81b551ed`)
      .set('Authorization', `Bearer ${token}`)
      .then(res => {
        console.log(res.body)
        expect(res.status).to.be.equal(404)
      })
    })
    it('should create a new watch event and retrieve it back', async()=>{
      return chai
      .request(app)
      .post(`/watch`)
      .set('Authorization', `Bearer ${token}`)
      .send(payload)
      .then(res => {
        watch.data.watchId = res.body.watchId
        watch.data.ownerId = res.body.ownerId
        expect(res.status).to.be.equal(201)
      })
    })
    it('should return the watch created in the previous post', async()=>{
      return chai
      .request(app)
      .get(`/watch/?watchId=${watch.data.watchId}`)
      .set('Authorization', `Bearer ${token}`)
      .then(res => {
        expect(res.status).to.be.equal(200)
      })
    })
    it('should return a 204 after updating the watch', async () => {

      return chai
      .request(app)
      .patch(`/watch`)
      .set('Authorization', `Bearer ${token}`)
      .send(watch)
      .then(res => {
        expect(res.status).to.be.equal(204)
      })
    })
    it('should remove the watch that was added', async () => {
      return chai
      .request(app)
      .delete(`/watch`)
      .set('Authorization', `Bearer ${token}`)
      .send(watch)
      .then(res => {
        expect(res.status).to.be.equal(204)
      })
    })
    it('should return a status 404 because the tenement does not exist', async () => {
      return chai
      .request(app)
      .get(`/watch/?watchId=${watch.data.watchId}`)
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