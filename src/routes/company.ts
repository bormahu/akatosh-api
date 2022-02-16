import * as companyController from '../controllers/company';
import { authMiddleware } from '../utils/auth0';
export class CompanyRoute {
  public routes(app):void{
    app.route('/companies').post(
      authMiddleware,
      companyController.addCompany
      )
    app.route('/companies').patch(
      authMiddleware,
      companyController.updateCompany
      )
    app.route('/companies').delete(
      authMiddleware,
      companyController.removeCompany
      )
    app.route('/companies').get(
      authMiddleware,
      companyController.getCompanies
      )
    app.route('/companies/:id').get(
      authMiddleware,
      companyController.getCompanyById
      )
  }
}
