import * as tenementController from '../controllers/tenement'

export class TenementRoute{
  public routes(app):void{
    app.route('/tenement').post(tenementController.addTenement)
    app.route('/tenement/:tenementId').patch(tenementController.updateTenement)
    app.route('/tenement/:tenementId').delete(tenementController.removeTenement)
    app.route('/tenement/:tenementId').get(tenementController.getTenement)
    app.route('/tenement/:tenementId').get(tenementController.getLiveTenements)

  }
}
