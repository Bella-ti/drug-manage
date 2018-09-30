const mongoose = require('mongoose')

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

const System = module.exports = mongoose.model('System', systemSchema)
