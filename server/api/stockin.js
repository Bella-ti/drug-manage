const express = require('express')
const router = express.Router()
const Stockin = require('../models/stockin')

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

  // let stockin = new Stockin({
  //   id: req.body.id,
  //   name: req.body.name,
  //   renumber: req.body.renumber,
  //   size: req.body.size,
  //   unit: req.body.unit,
  //   jx: req.body.jx,
  //   stockintory: req.body.factory,
  //   factoryJX: req.body.factoryJX,
  //   factoryPY: req.body.factoryPY,
  //   approvalNumber: req.body.approvalNumber,
  //   batchNumber: req.body.batchNumber,
  //   validPeriod: req.body.validPeriod,
  //   position: req.body.position,
  //   number: req.body.number,
  //   storagePeriod: req.body.storagePeriod,
  //   type: req.body.type,
  //   drugsType: req.body.drugsType,
  //   useType: req.body.useType,
  //   unitPrice: req.body.unitPrice,
  //   promotion: req.body.promotion,
  //   importPrice: req.body.importPrice
  // })
  // stockin.save((err, stockin) => {
  //   if (err) {
  //     res.json(err)
  //   } else {
  //     res.json(stockin)
  //   }
  // })
})

router.put('/stockin/:id', (req, res) => {
  Stockin.findOneAndUpdate({ _id: req.params.id }
    , {
      $set: {
        orderNum: req.body.orderNum,
        storageDate: req.body.storageDate,
        storageType: req.body.storageType,
        name: req.body.name,
        id: req.body.id,
        rename: req.body.rename,
        size: req.body.size,
        approvalNumber: req.body.approvalNumber,
        batchNumber: req.body.batchNumber,
        position: req.body.position,
        stockNum: req.body.stockNum,
        unitPrice: req.body.unitPrice,
        bornDate: req.body.bornDate,
        validPeriod: req.body.validPeriod,
        deliveryUnit: req.body.deliveryUnit,
        factory: req.body.factory,
        type: req.body.type,
        drugType: req.body.drugType,
        custom: req.body.custom,
        certificate: req.body.certificate,
        quality: req.body.quality,
        conclusion: req.body.conclusion,
        checkPerson: req.body.checkPerson,
        buyPerson: req.body.buyPerson
      }
    }, {
      new: true
    })
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
