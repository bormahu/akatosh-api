import * as tenementController from '../controllers/watchedTenement';
import { authMiddleware } from '../utils/auth0';
export class WatchedTenementRoute{
  public routes(app):void{
    app.route('/watch').post( 
      authMiddleware, 
      tenementController.addWatchedTenement
      )
    app.route('/watch').patch( 
      authMiddleware, 
      tenementController.updateWatchedTenement
      )
    app.route('/watch').delete( 
      authMiddleware, 
      tenementController.removeWatchedTenement
      )
    app.route('/watch/').get( 
      authMiddleware, 
      tenementController.getWatchById
      )
    app.route('/watch/owner').get( 
      authMiddleware, 
      tenementController.getWatchesByOwnerId
      )
  }
}
