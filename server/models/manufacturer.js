const mongoose = require('mongoose')

const manufacturerSchema = mongoose.Schema({
  id: {
    type: Number,
    required: true
  },
  name: String,
  pinyin: String,
  concatName: String,
  concatTel: String,
  license: String,
  isAllow: String,
  quality: String,
  legalPower: String,
  rename: String,
  address: String
})

const Manufacturer = module.exports = mongoose.model('Manufacturer', manufacturerSchema)
