const mongoose = require('mongoose')

const stockinSchema = mongoose.Schema({
  orderNum: {
    type: String,
    required: true
  },
  storageDate: Date,
  storageType: String,
  name: String,
  id: Number,
  rename: String,
  size: String,
  approvalNumber: String,
  batchNumber: String,
  position: String,
  stockNum: Number,
  unitPrice: String,
  bornDate: Date,
  validPeriod: Date,
  deliveryUnit: String,
  factory: String,
  type: String,
  drugType: String,
  custom: String,
  certificate: String,
  quality: String,
  conclusion: String,
  checkPerson: String,
  buyPerson: String
})

const Stockin = module.exports = mongoose.model('Stockin', stockinSchema)
