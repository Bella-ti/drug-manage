const mongoose = require('mongoose')

const outstockSchema = mongoose.Schema({
  outNum: {
    type: Number,
    required: true
  },
  goodsName: String,
  goodsId: String,
  outType: String,
  batchNumber: String,
  manufacturer: String,
  totalNum: String,
  operator: String,
  dosageForms: String,
  saleUnitPrice: String,
  validDate: String,
  outTime: Date
})

module.exports = mongoose.model('Outstock', outstockSchema)
