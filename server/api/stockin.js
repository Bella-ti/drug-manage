const express = require('express')
const router = express.Router()
const Stockin = require('../models/stockin')

const stockInfo = function(param) {
  return {
    orderNum: param.orderNum,
    storageDate: param.storageDate,
    storageType: param.storageType,
    goodsName: param.goodsName,
    goodsId: param.goodsId,
    pinyinMa: param.pinyinMa,
    dosageForms: param.dosageForms,
    approvalNumber: param.approvalNumber,
    batchNumber: param.batchNumber,
    location: param.location,
    inventory: param.inventory,
    unitPrice: param.unitPrice,
    producteDate: param.producteDate,
    validPeriod: param.validPeriod,
    supplyUnit: param.supplyUnit,
    manufacturer: param.manufacturer,
    goodsType: param.goodsType,
    drugCategory: param.drugCategory,
    customClass: param.customClass,
    certificate: param.certificate,
    quality: param.quality,
    conclusion: param.conclusion,
    acceptPerson: param.acceptPerson,
    purchaser: param.purchaser
  }
}

router.get('/stockin', (req, res) => {
  Stockin.find({})
    .sort({ update_at: -1 })
    .then(stockin => {
      res.json(stockin)
    })
    .catch(err => {
      res.json(err)
    })
})

router.get('/stockin/:id', (req, res) => {
  Stockin.findById(req.params.id)
    .then(stockin => {
      res.json(stockin)
    })
    .catch(err => {
      res.json(err)
    })
})

router.post('/stockin', (req, res) => {
  Stockin.create(req.body, (err, stockin) => {
    if (err) {
      res.json(err)
    } else {
      res.json(stockin)
    }
  })
})

router.put('/stockin/:id', (req, res) => {
  Stockin.findOneAndUpdate(
    { _id: req.params.id },
    {
      $set: stockInfo(req.body)
    },
    {
      new: true
    }
  )
    .then(stockin => res.json(stockin))
    .catch(err => res.json(err))
})

router.delete('/stockin/:id', (req, res) => {
  Stockin.findOneAndRemove({
    _id: req.params.id
  })
    .then(stockin => res.send(`${stockin.name}删除成功`))
    .catch(err => res.json(err))
})

module.exports = router
