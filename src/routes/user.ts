import * as userController from '../controllers/user'

export class UserRoute {
  public routes(app):void{
    app.route('/users').post(userController.addUser)
    app.route('/users').patch(userController.updateUser)
    app.route('/users').delete(userController.removeUser)
    app.route('/users/').get(userController.getUser)
  }
}
