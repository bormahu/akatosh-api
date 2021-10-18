import * as companyController from '../controllers/company'

export class CompanyRoute{
  public routes(app):void{
    app.route('/companies').post(companyController.addCompany)
    app.route('/companies').patch(companyController.updateCompany)
    app.route('/companies').delete(companyController.removeCompany)
    app.route('/companies').get(companyController.getCompany)
  }
}
