const mongoose = require('mongoose')

const drugSchema = mongoose.Schema({
  id: { type: Number, required: true },
  name: String,
  rename: String,
  size: String,
  approvalNumber: String,
  batchNumber: String,
  position: String,
  number: Number,
  unitPrice: String,
  salePrice: String,
  promotion: String,
  bornDate: Date,
  validPeriod: Date,
  deliveryUnit: String,
  factory: String,
  type: String,
  drugsType: String,
  custom: String
})

const Drug = module.exports = mongoose.model('Drug', drugSchema)
