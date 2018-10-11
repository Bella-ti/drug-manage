const express = require('express')
const router = express.Router()
const Fac = require('../models/factory')

// 查询所有供应商信息
router.get('/factory', (req, res) => {
  Fac.find({})
    .sort({ update_at: -1 })
    .then(factory => {
      res.json(factory)
    })
    .catch(err => {
      res.json(err)
    })
})
// 通过ObjectId查询单个供应商信息
router.get('/fac/:id', (req, res) => {
  Fac.findById(req.params.id)
    .then(fac => {
      res.json(fac)
    })
    .catch(err => {
      res.json(err)
    })
})
// 添加一个供应商信息
router.post('/fac', (req, res) => {
  // 使用实例的save方法存储数据
  let Fac = new Fac({
    id: req.body.id,
    name: req.body.name,
    renumber: req.body.renumber,
    size: req.body.size,
    unit: req.body.unit,
    jx: req.body.jx,
    factory: req.body.factory,
    factoryJX: req.body.factoryJX,
    factoryPY: req.body.factoryPY,
    approvalNumber: req.body.approvalNumber,
    batchNumber: req.body.batchNumber,
    validPeriod: req.body.validPeriod,
    position: req.body.position,
    number: req.body.number,
    storagePeriod: req.body.storagePeriod,
    type: req.body.type,
    drugsType: req.body.drugsType,
    useType: req.body.useType,
    unitPrice: req.body.unitPrice,
    promotion: req.body.promotion,
    importPrice: req.body.importPrice
  })
  // 使用Fac model上的create方法储存数据
  Fac.create(req.body, (err, fac) => {
    if (err) {
      res.json(err)
    } else {
      res.json(fac)
    }
  })
  Fac.save((err, fac) => {
    if (err) {
      res.json(err)
    } else {
      res.json(fac)
    }
  })
})
// 更新一个供应商信息
router.put('/fac/:id', (req, res) => {
  Fac.findOneAndUpdate(
    { _id: req.params.id },
    {
      $set: {
        ID: req.body.ID,
        name: req.body.name,
        pinyin: req.body.pinyin,
        drugType: req.body.drugType,
        jixing: req.body.jixing,
        guige: req.body.guige,
        stockMax: req.body.stockMax,
        stockMin: req.body.stockMin
      }
    },
    {
      new: true
    }
  )
    .then(fac => res.json(fac))
    .catch(err => res.json(err))
})
// 删除一个供应商信息
router.delete('/fac/:id', (req, res) => {
  Fac.findOneAndRemove({
    _id: req.params.id
  })
    .then(fac => res.send(`${fac.name}删除成功`))
    .catch(err => res.json(err))
})

module.exports = router
