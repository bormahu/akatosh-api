import * as companyController from '../controllers/company'

export class CompanyRoute{
  public routes(app):void{
    // app.route('/companies').post(companyController.addCompany)
    // app.route('/companies/:companyName').patch(companyController.updateCompany)
    // app.route('/companies/:companyName').delete(companyController.removeCompany)
    app.route('/companies/:companyName').get(companyController.getCompany)
  }
}
