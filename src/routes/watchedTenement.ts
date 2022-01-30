import * as passport from 'passport';
import * as tenementController from '../controllers/watchedTenement';
import { PassportConfig } from '../utils/passportConfig';

export class WatchedTenementRoute extends PassportConfig{
  public routes(app):void{
    app.route('/watch').post(
      passport.authenticate('jwt', {session:false}),
      tenementController.addWatchedTenement,
      )
    app.route('/watch').patch(
      passport.authenticate('jwt', {session:false}),
      tenementController.updateWatchedTenement,
      )
    app.route('/watch').delete(
      passport.authenticate('jwt', {session:false}),
      tenementController.removeWatchedTenement,
      )
    app.route('/watch/').get(
      passport.authenticate('jwt', {session:false}),
      tenementController.getWatchById,
      )
    app.route('/watch/owner').get(
      passport.authenticate('jwt', {session:false}),
      tenementController.getWatchesByOwnerId,
    )
  }
}
