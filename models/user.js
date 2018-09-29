const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
  order: {
    type: String,
    required: true
  },
  username: String,
  password: String,
  info: {
    address: String,
    phone: String,
    sayAs: String
  },
  type: Number,
  information: Object,
  array: Object,
  created_at: { type: Date, default: Date.now },
  update_at: { type: Date, default: Date.now }
})

const User = module.exports = mongoose.model('User', userSchema)
