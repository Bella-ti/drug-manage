const mongoose = require('mongoose')

const drugsaleSchema = mongoose.Schema({
  orderNumber: Number,
  saleTime: Date,
  saleMoney: Number,
  seller: String,
  saleInfo: Object
  // [商品id,商品name,生产厂家,批号，销售数量，进价,销售单价]
})

module.exports = mongoose.model('Drugsale', drugsaleSchema)
