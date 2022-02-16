import * as AOIController from '../controllers/areaOfInterest';
import { authMiddleware } from '../utils/auth0';
export class AreaOfInterestRoute {
  public routes(app):void{
    app.route('/interest-areas').post(
      authMiddleware,
      AOIController.addAreaOfInterest
      )
    app.route('/interest-areas').patch(
      authMiddleware,
      AOIController.updateAreaOfInterest
      )
    app.route('/interest-areas').delete(
      authMiddleware,
      AOIController.removeAreaOfInterest
      )
    app.route('/interest-areas').get(
      authMiddleware,
      AOIController.getAreasOfInterest
      )
    app.route('/interest-areas/:id').get(
      authMiddleware,
      AOIController.getAreaOfInterest
      )
  }
}