import * as passport from 'passport'
import * as userController from '../controllers/user';
import { PassportConfig } from '../utils/passportConfig';
export class UserRoute extends PassportConfig{
  public routes(app):void{
    app.route('/users').post(userController.addUser)
    app.route('/users').patch(
      passport.authenticate('jwt', {session:false}),
      userController.updateUser,
      )
    app.route('/users').delete(
      passport.authenticate('jwt', {session:false}),
      userController.removeUser,
      )
    app.route('/users').get(
      passport.authenticate('jwt', {session:false}),
      userController.getUser,
      )
    app.route('/users/login').post(userController.login)
  }
}
