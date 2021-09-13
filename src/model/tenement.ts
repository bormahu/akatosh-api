'use strict'

export default interface Tenement{
  id: String
  license: String
  licenseSpecial: String
  surveyStatus: String
  tenementStatus: String
  dateStarted: Date
  dateEnded: Date
  dateGranted: Date
  primaryTenementHolder: String
  legalArea: String
  area: Number

}
