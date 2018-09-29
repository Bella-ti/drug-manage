const mongoose = require('mongoose')

const drugSchema = mongoose.Schema({
  id: { type: Number, required: true },
  name: String,
  numberMe: String,
  storagePeriod: String,
  renumber: String,
  size: String,
  deliveryUnit: String,
  drugInfo: String,
  number: String,
  approvalNumber: String,
  batchNumber: String,
  position: String,
  comePrice: String,
  comTotalPrice: String,
  unitPrice: String,
  validPeriod: String,
  beginDate: String,
  promotion: String,
  type: String,
  drugsType: String,
  custom: String,
  conclusion: String,
  certificate: String,
  quality: String,
  checkPerson: String,
  buyPerson: String,
  positionSaid: String,
  extra: String
})

const Drug = module.exports = mongoose.model('Drug', drugSchema)
