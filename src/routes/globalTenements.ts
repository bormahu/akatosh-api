import * as passport from 'passport';
import * as globalTenementController from '../controllers/globalTenements';
import { PassportConfig } from '../utils/passportConfig';

export class GlobalTenementRoute extends PassportConfig{
  public routes(app):void{
    app.route('/tenement').post(
      passport.authenticate('jwt', {session:false}),
      globalTenementController.addGlobalTenement
      )
    app.route('/tenement').get(
      passport.authenticate('jwt', {session:false}),
      globalTenementController.getTenement
      )
    app.route('/tenements').get(
      passport.authenticate('jwt', {session:false}),
      globalTenementController.getTenements
    )
    app.route('/tenement').patch(
      passport.authenticate('jwt', {session:false}),
      globalTenementController.updateGlobalTenement
      )
    app.route('/tenement').delete(
      passport.authenticate('jwt', {session:false}),
      globalTenementController.removeGlobalTenement
      )
  }
}