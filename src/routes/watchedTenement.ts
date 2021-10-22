import * as tenementController from '../controllers/watchedTenement';

export class WatchedTenementRoute{
  public routes(app):void{
    app.route('/watch').post(tenementController.addWatchedTenement)
    app.route('/watch').patch(tenementController.updateWatchedTenement)
    app.route('/watch').delete(tenementController.removeWatchedTenement)
    app.route('/watch').get(tenementController.getWatchedTenements)

  }
}
