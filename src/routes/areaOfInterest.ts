import * as AOIController from '../controllers/areaOfInterest'

export class AreaOfInterestRoute{
  public routes(app):void{
    app.route('/aoi').post(AOIController.addAreaOfInterest)
    app.route('/aoi').patch(AOIController.updateAreaOfInterest)
    app.route('/aoi').delete(AOIController.removeAreaOfInterest)
    app.route('/aoi').get(AOIController.getAreasOfInterest)

  }
}