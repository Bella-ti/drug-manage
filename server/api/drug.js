const express = require('express')
const router = express.Router()
const Drug = require('../models/drug')

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
    Drug.create(req.body, (err, drug) => {
        if (err) {
            res.json(err)
        } else {
            res.json(drug)
        }
    })
})

router.put('/drug/:id', (req, res) => {
    Drug.findOneAndUpdate({ _id: req.params.id }
        , {
            $set: {
                id: req.body.id,
                name: req.body.name,
                rename: req.body.rename,
                size: req.body.size,
                approvalNumber: req.body.approvalNumber,
                batchNumber: req.body.batchNumber,
                position: req.body.position,
                number: req.body.number,
                unitPrice: req.body.unitPrice,
                salePrice: req.body.salePrice,
                promotion: req.body.promotion,
                bornDate: req.body.bornDate,
                validPeriod: req.body.validPeriod,
                deliveryUnit: req.body.deliveryUnit,
                factory: req.body.factory,
                type: req.body.type,
                drugsType: req.body.drugsType,
                custom: req.body.custom
            }
        }, {
            new: true
        })
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
