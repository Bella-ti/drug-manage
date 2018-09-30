const express = require('express')
const router = express.Router()
const Outstock = require('../models/outstock')

router.get('/outstock', (req, res) => {
    Outstock.find({})
        .then(outstock => {
            res.json(outstock)
        })
        .catch(err => {
            res.json(err)
        })
})

router.get('/outstock/:id', (req, res) => {
    Outstock.findById(req.params.id)
        .then(outstock => {
            res.json(outstock)
        })
        .catch(err => {
            res.json(err)
        })
})

router.post('/outstock', (req, res) => {
    Outstock.create(req.body, (err, outstock) => {
        if (err) {
            res.json(err)
        } else {
            res.json(outstock)
        }
    })
})

// router.put('/outstock', (req, res) => {
//     Outstock.findOneAndUpdate({ _id: req.params.id }
//         , {
//             $set: {
//                 id: req.body.id,
//                 name: req.body.name,
//                 pinyin: req.body.pinyin,
//                 concatName: req.body.concatName,
//                 concatTel: req.body.concatTel,
//                 license: req.body.license,
//                 isAllow: req.body.isAllow,
//                 quality: req.body.quality,
//                 legalPower: req.body.legalPower,
//                 rename: req.body.rename,
//                 address: req.body.address
//             }
//         }, {
//             new: true
//         })
//         .then(outstock => res.json(outstock))
//         .catch(err => res.json(err))
// })

router.delete('/outstock/:id', (req, res) => {
    Outstock.findOneAndRemove({ _id: req.params.id })
        .then(outstock => res.send(`${outstock.order}删除成功`))
        .catch(err => res.json(err))
})

module.exports = router
