import * as testController from '../controllers/test'

export class TestRoute {
  public routes(app):void{
    // app.route('/users').post(userController.addUser)
    app.route('/test/:id').get(testController.getUser)
  }
}