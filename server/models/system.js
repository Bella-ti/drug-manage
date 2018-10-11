const mongoose = require('mongoose')

/** 系统设置
 * 常规设置
 * dateTime 最近一次销售时间
 * cardLength 会员卡卡号长度（6~24位）
 * limitDay 药品销售有效期
 * copyPath 备份文件路径
 * copyDay 自动备份时间
 * 积分规则
 * saveGrade 积分参数
 * checkedInt 积分取整
 * discount 会员折扣 （1~10,可以为小数）
 * 销售设置
 * allowTab是否可直接销售库房商品
 * wordAlarm 处方药文字提醒
 * limitYellow 商品数量小于下限，黄色提示
 * limitDayDone 商品已过保质期，红色提示
 * asTime 查询药品按入库时间排序
 * calculateAgain 销售价小于预售价，提示重新计算
 * 交班条内容
 * allMoney 当天的总营业额
 * changeWho 当天促销商品，及销售数量
 * salesPar 交班时间
 * changeTime 换班人员
 */

const systemSchema = mongoose.Schema({
  order: {
    type: String,
    required: true
  },
  dateTime: String,
  cardLength: String,
  limitDay: String,
  copyPath: String,
  copyDay: String,
  saveGrade: String,
  discount: String,
  checkedInt: Boolean,
  allowTab: Boolean,
  wordAlarm: Boolean,
  limitYellow: Boolean,
  limitDayDone: Boolean,
  asTime: Boolean,
  calculateAgain: Boolean,
  allMoney: Boolean,
  changeWho: Boolean,
  salesPar: Boolean,
  changeTime: Boolean,
  created_at: { type: Date, default: Date.now },
  update_at: { type: Date, default: Date.now }
})

module.exports = mongoose.model('System', systemSchema)
