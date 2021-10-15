import * as tenementController from '../controllers/watchedTenement'

export class WatchedTenementRoute{
  public routes(app):void{
    app.route('/watch').post(tenementController.addWatchedTenement)
    app.route('/watch/:watchId').patch(tenementController.updateWatchedTenement)
    app.route('/watch/:watchId').delete(tenementController.removeWatchedTenement)
    app.route('/watch').get(tenementController.getWatchedTenements)

  }
}
