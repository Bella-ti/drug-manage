const mongoose = require('mongoose')

const drugsaleSchema = mongoose.Schema({
  orderNumber: Number,
  saleTime: Date,
  saleMoney: Number,
  seller: String,
  saleInfo: Object
  // [药品id,药品name,生产厂家,批号，销售数量，进价,销售单价]
})

const Drugsale = module.exports = mongoose.model('Drugsale', drugsaleSchema)
