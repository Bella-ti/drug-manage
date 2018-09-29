const express = require('express')
const router = express.Router()
const Manufacturer = require('../models/manufacturer')

// 查询系统设置信息
router.get('/manufacturer', (req, res) => {
    Manufacturer.find({})
        .then(manufacturer => {
            res.json(manufacturer)
        })
        .catch(err => {
            res.json(err)
        })
})
// 通过ObjectId查询单个药品
router.get('/manufacturer/:id', (req, res) => {
    Manufacturer.findById(req.params.id)
        .then(manufacturer => {
            res.json(manufacturer)
        })
        .catch(err => {
            res.json(err)
        })
})
// 添加系统的配置
router.post('/manufacturer', (req, res) => {
    // 使用Manufacturer model上的create方法储存数据
    Manufacturer.create(req.body, (err, manufacturer) => {
        if (err) {
            res.json(err)
        } else {
            res.json(manufacturer)
        }
    })
    //使用实例的save方法存储数据
    // let manufacturer = new Manufacturer({
    //     id: req.body.id,
    //     name: req.body.name,
    //     pinyin: req.body.pinyin,
    //     concatName: req.body.concatName,
    //     concatTel: req.body.concatTel,
    //     license: req.body.license,
    //     isAllow: req.body.isAllow,
    //     quality: req.body.quality,
    //     legalPower: req.body.legalPower
    // })
    // Manufacturer.save((err, manufacturer) => {
    //     if (err) {
    //         console.log(err);
    //         res.send({
    //             message: 'something went wrong'
    //         })
    //     } else {
    //         res.send({
    //             message: 'the appointment has been saved'
    //         })
    //     }
    // })
})
//更新系统配置信息
router.put('/manufacturer', (req, res) => {
    Manufacturer.findOneAndUpdate({ _id: req.params.id }
        , {
            $set: {
                id: req.body.id,
                name: req.body.name,
                pinyin: req.body.pinyin,
                concatName: req.body.concatName,
                concatTel: req.body.concatTel,
                license: req.body.license,
                isAllow: req.body.isAllow,
                quality: req.body.quality,
                legalPower: req.body.legalPower,
                rename: req.body.rename,
                address: req.body.address
            }
        }, {
            new: true
        })
        .then(manufacturer => res.json(manufacturer))
        .catch(err => res.json(err))
})
//删除一个药品
router.delete('/manufacturer/:id', (req, res) => {
    Manufacturer.findOneAndRemove({ _id: req.params.id })
        .then(manufacturer => res.send(`${manufacturer.order}删除成功`))
        .catch(err => res.json(err))
})

module.exports = router
