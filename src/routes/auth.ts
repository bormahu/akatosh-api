import * as passport from 'passport'
import * as AuthController from '../controllers/auth';
import { PassportConfig } from '../utils/passportConfig';

export class AuthRoute extends PassportConfig{
    public routes(app):void{
        app.route('/auth/login').post(AuthController.login)
      }
}