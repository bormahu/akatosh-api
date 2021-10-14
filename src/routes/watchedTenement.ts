import * as tenementController from '../controllers/watchedTenement'

export class WatchedTenementRoute{
  public routes(app):void{
    app.route('/tenement').post(tenementController.addWatchedTenement)
    app.route('/tenement/:tenementId').patch(tenementController.updateWatchedTenement)
    app.route('/tenement/:tenementId').delete(tenementController.removeWatchedTenement)
    app.route('/tenement/:tenementId').get(tenementController.getWatchedTenements)

  }
}
