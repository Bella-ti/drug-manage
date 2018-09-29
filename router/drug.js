const express = require('express')
const router = express.Router()
const Drug = require('../models/drug')

// 查询所有药品
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
// 通过ObjectId查询单个药品
router.get('/drug/:id', (req, res) => {
    Drug.findById(req.params.id)
        .then(drug => {
            res.json(drug)
        })
        .catch(err => {
            res.json(err)
        })
})
// 添加一个药品
router.post('/drug', (req, res) => {
    //使用Drug model上的create方法储存数据
    Drug.create(req.body, (err, drug) => {
        if (err) {
            res.json(err)
        } else {
            res.json(drug)
        }
    })
    //使用实例的save方法存储数据
    // let Drug = new Drug({
    //     id: req.body.id,
    //     name: req.body.name,
    //     numberMe: req.body.numberMe,
    //     storagePeriod: req.body.storagePeriod,
    //     renumber: req.body.renumber,
    //     size: req.body.size,
    //     deliveryUnit: req.body.deliveryUnit,
    //     drugInfo: req.body.drugInfo,
    //     number: req.body.number,
    //     approvalNumber: req.body.approvalNumber,
    //     batchNumber: req.body.batchNumber,
    //     position: req.body.position,
    //     comePrice: req.body.comePrice,
    //     comTotalPrice: req.body.comTotalPrice,
    //     unitPrice: req.body.unitPrice,
    //     validPeriod: req.body.validPeriod,
    //     beginDate: req.body.beginDate,
    //     promotion: req.body.promotion,
    //     type: req.body.type,
    //     drugsType: req.body.drugsType,
    //     custom: req.body.custom,
    //     conclusion: req.body.conclusion,
    //     certificate: req.body.certificate,
    //     quality: req.body.quality,
    //     checkPerson: req.body.checkPerson,
    //     buyPerson: req.body.buyPerson,
    //     positionSaid: req.body.positionSaid,
    //     extra: req.body.extra
    // })
    // drug.save((err, drug) => {
    //     if (err) {
    //         res.json(err)
    //     } else {
    //         res.json(drug)
    //     }
    // })
})
//更新一个药品
router.put('/drug/:id', (req, res) => {
    Drug.findOneAndUpdate({ _id: req.params.id }
        , {
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
        }, {
            new: true
        })
        .then(drug => res.json(drug))
        .catch(err => res.json(err))
})
//删除一个药品
router.delete('/drug/:id', (req, res) => {
    Drug.findOneAndRemove({
        _id: req.params.id
    })
        .then(drug => res.send(`${drug.name}删除成功`))
        .catch(err => res.json(err))
})

module.exports = router
