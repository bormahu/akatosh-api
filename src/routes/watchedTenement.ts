import * as tenementController from '../controllers/watchedTenement';
import { authMiddleware } from '../utils/auth0';
export class WatchedTenementRoute{
  public routes(app):void{
    app.route('/watches').post( 
      authMiddleware, 
      tenementController.addWatchedTenement
      )
    app.route('/watches').patch( 
      authMiddleware, 
      tenementController.updateWatchedTenement
      )
    app.route('/watches').delete( 
      authMiddleware, 
      tenementController.removeWatchedTenement
      )
    // Get all watched tenements
    app.route('/watches').get(
      authMiddleware,
      tenementController.getWatches
      )
    // get all watched tenements by user
    app.route('/watches/owners/:id').get(
      authMiddleware,
      tenementController.getWatchesByOwner
    )
    // get a specific watched tenement by its id
    app.route('/watches/:id').get( 
      authMiddleware, 
      tenementController.getWatch
      )
  }
}
