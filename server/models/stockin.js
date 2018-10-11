const mongoose = require('mongoose')

/** 入库记录
 * orderNum 入库单号
 * storageDate 入库日期
 * storageType 入库类型
 * goodsName 商品名称
 * goodsId 商品ID
 * pinyinMa 拼音码
 * dosageForms 剂型
 * approvalNumber 批准文号
 * batchNumber 批号
 * location 货位
 * warehouseNum 入库数量
 * unitPrice 进价
 * producteDate 生产日期
 * validPeriod 有效期
 * supplyUnit 供货单位
 * manufacturer 厂家
 * goodsType 商品种类
 * drugCategory 药品类别
 * customClass 自定义类
 * certificate 合格证
 * quality 外观质量
 * conclusion 验收结论
 * acceptPerson 验收人
 * purchaser 采购员
 */

const stockinSchema = mongoose.Schema({
  orderNum: {
    type: String,
    required: true
  },
  storageDate: Date,
  storageType: String,
  goodsName: String,
  goodsId: Number,
  pinyinMa: String,
  dosageForms: String,
  approvalNumber: String,
  batchNumber: String,
  location货位: String,
  warehouseNum: Number,
  unitPrice: String,
  producteDate: Date,
  validPeriod: Date,
  supplyUnit: String,
  manufacturer: String,
  goodsType: String,
  drugCategory: String,
  customClass: String,
  certificate: String,
  quality: String,
  conclusion: String,
  acceptPerson: String,
  purchaser: String
})

module.exports = mongoose.model('Stockin', stockinSchema)
