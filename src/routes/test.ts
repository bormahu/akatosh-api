// import * as testORM from '../controllers/testTypeORM'
const testORM = require('../controllers/test')

export class TestRoute {
  public routes(app):void{
    // app.route('/users').post(userController.addUser)
    app.route('/test').post(testORM.addUser)
    app.route('/test').get(testORM.getUser)
    
  }
}