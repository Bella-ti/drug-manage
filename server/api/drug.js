const express = require('express')
const router = express.Router()
const Drug = require('../models/drug')

const checkGoods = function(param) {
    return {
        goodsId: param.goodsId,
        goodsName: param.goodsName,
        pinyinMa: param.pinyinMa,
        dosageForms: param.dosageForms,
        approvalNumber: param.approvalNumber,
        batchNumber: param.batchNumber,
        location: param.location,
        inventory: param.inventory,
        unitPrice: param.unitPrice,
        salePrice: param.salePrice,
        promotion: param.promotion,
        producteDate: param.producteDate,
        validPeriod: param.validPeriod,
        supplyUnit: param.supplyUnit,
        manufacturer: param.manufacturer,
        goodsType: param.goodsType,
        drugCategory: param.drugCategory,
        customClass: param.customClass
    }
}

router.get('/drug', (req, res) => {
  Drug.find({})
    .sort({ update_at: -1 })
    .then(drug => {
      res.json(drug)
    })
    .catch(err => {
      res.json(err)
    })
})

router.get('/drug/:id', (req, res) => {
  Drug.findById(req.params.id)
    .then(drug => {
      res.json(drug)
    })
    .catch(err => {
      res.json(err)
    })
})

router.post('/drug', (req, res) => {
  const goods = checkGoods(req.body)
  Drug.create(goods, (err, drug) => {
    if (err) {
      res.json(err)
    } else {
      res.json(drug)
    }
  }).then(drug => res.json(drug))
  .catch(err => res.json(err))
})

router.put('/drug/:id', (req, res) => {
  Drug.findOneAndUpdate(
    { _id: req.params.id },
    {
      $set: checkGoods(req.body)
    },
    {
      new: true
    }
  )
    .then(drug => res.json(drug))
    .catch(err => res.json(err))
})

router.delete('/drug/:id', (req, res) => {
  Drug.findOneAndRemove({
    _id: req.params.id
  })
    .then(drug => res.send(`${drug.name}删除成功`))
    .catch(err => res.json(err))
})

module.exports = router
