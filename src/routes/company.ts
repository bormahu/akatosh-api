import * as passport from 'passport'
import * as companyController from '../controllers/company';
import { PassportConfig } from '../utils/passportConfig';
export class CompanyRoute extends PassportConfig{
  public routes(app):void{
    app.route('/companies').post(
      passport.authenticate('jwt', {session:false}),
      companyController.addCompany
      )
    app.route('/companies').patch(
      passport.authenticate('jwt', {session:false}),
      companyController.updateCompany
      )
    app.route('/companies').delete(
      passport.authenticate('jwt', {session:false}),
      companyController.removeCompany
      )
    app.route('/companies/').get(
      passport.authenticate('jwt', {session:false}),
      companyController.getCompany
      )
  }
}
