const mongoose = require('mongoose')

const outstockSchema = mongoose.Schema({
  outNum: {
    type: Number,
    required: true
  },
  name: String,
  drugId: String,
  outType: String,
  batchNumber: String,
  factory: String,
  totalNum: String,
  operator: String,
  guige: String,
  saleUnitPrice: String,
  validDate: String,
  outTime: Date
})

const Outstock = module.exports = mongoose.model('Outstock', outstockSchema)
