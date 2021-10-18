import * as globalTenementController from '../controllers/globalTenements'

export class GlobalTenementRoute{
  public routes(app):void{
    app.route('/tenement').post(globalTenementController.addGlobalTenement)
    app.route('/tenement').get(globalTenementController.getTenement)
  }
}