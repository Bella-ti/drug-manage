const mongoose = require('mongoose')

/** 库存商品信息
 * goodsName 商品名称
 * goodsId 商品ID
 * pinyinMa 拼音码
 * dosageForms 剂型
 * approvalNumber 批准文号
 * batchNumber 批号
 * location 货位
 * inventory 库存量
 * unitPrice 进价
 * salePrice 售价
 * promotion 折扣
 * producteDate 生产日期
 * validPeriod 有效期
 * supplyUnit 供货单位
 * manufacturer 厂家
 * goodsType 商品种类
 * drugCategory 药品类别
 * customClass 自定义类
 */
const drugSchema = mongoose.Schema({
  goodsId: { type: Number, required: true },
  goodsName: String,
  pinyinMa: String,
  dosageForms: String,
  approvalNumber: String,
  batchNumber: String,
  location: String,
  inventory: Number,
  unitPrice: String,
  salePrice: String,
  promotion: String,
  producteDate: Date,
  validPeriod: Date,
  supplyUnit: String,
  manufacturer: String,
  goodsType: String,
  drugCategory: String,
  customClass: String
})

module.exports = mongoose.model('Drug', drugSchema)
