import * as globalTenementController from '../controllers/globalTenements';
import { authMiddleware } from '../utils/auth0';
export class GlobalTenementRoute{
  public routes(app):void{
    app.route('/tenement').post(
      authMiddleware,
      globalTenementController.addGlobalTenement
      )
    app.route('/tenement').get(
      authMiddleware,
      globalTenementController.getTenement
      )
    app.route('/tenements').get(
      authMiddleware,
      globalTenementController.getTenements
    )
    app.route('/tenement').patch(
      authMiddleware,
      globalTenementController.updateGlobalTenement
      )
    app.route('/tenement').delete(
      authMiddleware,
      globalTenementController.removeGlobalTenement
      )
  }
}