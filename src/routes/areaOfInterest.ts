import * as passport from 'passport'
import * as AOIController from '../controllers/areaOfInterest';
import { PassportConfig } from '../utils/passportConfig';
export class AreaOfInterestRoute extends PassportConfig{
  public routes(app):void{
    app.route('/aoi').post(
      passport.authenticate('jwt', {session:false}),
      AOIController.addAreaOfInterest
      )
    app.route('/aoi').patch(
      passport.authenticate('jwt', {session:false}),
      AOIController.updateAreaOfInterest
      )
    app.route('/aoi').delete(
      passport.authenticate('jwt', {session:false}),
      AOIController.removeAreaOfInterest
      )
    app.route('/aoi').get(
      passport.authenticate('jwt', {session:false}),
      AOIController.getAreasOfInterest
      )
  }
}