import * as globalTenementController from '../controllers/globalTenements';
import { authMiddleware } from '../utils/auth0';
export class GlobalTenementRoute{
  public routes(app):void{
    app.route('/tenements').post(
      authMiddleware,
      globalTenementController.addGlobalTenement
      )
    app.route('/tenements').patch(
      authMiddleware,
      globalTenementController.updateGlobalTenement
      )
    app.route('/tenements').delete(
      authMiddleware,
      globalTenementController.removeGlobalTenement
      )
    app.route('/tenements').get(
      authMiddleware,
      globalTenementController.getTenements
      )
    app.route('/tenements/:id').get(
      authMiddleware,
      globalTenementController.getTenement
      )
  }
}