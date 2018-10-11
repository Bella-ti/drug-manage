const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
  /** 用户信息
   * order 编号
   * username 用户名
   * password 密码
   * information.address 住址
   * information.phone 电话
   * information.sayAs 说明
   * type 职务 1 管理员 2 销售员 3 仓库管理员
   * isAdmin 是否是管理员
   * created_at 创建时间
   * update_at 更新时间
   */
  order: {
    type: String,
    required: true
  },
  username: String,
  password: String,
  information: {
    address: String,
    phone: String,
    sayAs: String
  },
  type: Number,
  isAdmin: Boolean,
  created_at: { type: Date, default: Date.now },
  update_at: { type: Date, default: Date.now }
})

module.exports = mongoose.model('User', userSchema)
