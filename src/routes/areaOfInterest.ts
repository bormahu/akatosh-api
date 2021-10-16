import * as AOIController from '../controllers/areaOfInterest'

export class AreaOfInterestRoute{
  public routes(app):void{
    app.route('/watch').post(AOIController.addAreaOfInterest)
    app.route('/watch/:watchId').patch(AOIController.updateAreaOfInterest)
    app.route('/watch/:watchId').delete(AOIController.removeAreaOfInterest)
    app.route('/watch').get(AOIController.getAreasOfInterest)

  }
}