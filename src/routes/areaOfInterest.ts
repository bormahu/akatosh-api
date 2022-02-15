import * as AOIController from '../controllers/areaOfInterest';
import { authMiddleware } from '../utils/auth0';
export class AreaOfInterestRoute {
  public routes(app):void{
    app.route('/aoi').post(
      authMiddleware,
      AOIController.addAreaOfInterest
      )
    app.route('/aoi').patch(
      authMiddleware,
      AOIController.updateAreaOfInterest
      )
    app.route('/aoi').delete(
      authMiddleware,
      AOIController.removeAreaOfInterest
      )
    app.route('/aoi').get(
      authMiddleware,
      AOIController.getAreasOfInterest
      )
  }
}