const express = require('express')
const router = express.Router()
const System = require('../models/system')

// 查询系统设置信息
router.get('/system', (req, res) => {
    System.find({})
        .then(system => {
            res.json(system)
        })
        .catch(err => {
            res.json(err)
        })
})
// 通过ObjectId查询单个药品
router.get('/system/:id', (req, res) => {
    System.findById(req.params.id)
        .then(system => {
            res.json(system)
        })
        .catch(err => {
            res.json(err)
        })
})
// 添加系统的配置
router.post('/system', (req, res) => {
    //使用System model上的create方法储存数据
    // System.create(req.body, (err, system) => {
    //     if (err) {
    //         res.json(err)
    //     } else {
    //         res.json(system)
    //     }
    // })
    //使用实例的save方法存储数据
    let system = new System({
        order: req.body.order,
        dateTime: req.body.dateTime,
        cardLength: req.body.cardLength,
        limitDay: req.body.limitDay,
        copyPath: req.body.copyPath,
        copyDay: req.body.copyDay,
        saveGrade: req.body.saveGrade,
        checkedInt: req.body.checkedInt,
        allowTab: req.body.allowTab,
        wordAlarm: req.body.wordAlarm,
        limitYellow: req.body.limitYellow,
        limitDayDone: req.body.limitDayDone,
        asTime: req.body.asTime,
        calculateAgain: req.body.calculateAgain,
        allMoney: req.body.allMoney,
        changeWho: req.body.changeWho,
        salesPar: req.body.salesPar,
        changeTime: req.body.changeTime
    })
    system.save((err, system) => {
        if (err) {
            console.log(err);
            res.send({
                message: 'something went wrong'
            })
        } else {
            res.send({
                message: 'the appointment has been saved'
            })
        }
    })
})
//更新系统配置信息
router.put('/system', (req, res) => {
    System.findOneAndUpdate({}
        , {
            $set: {
                order: req.body.order,
                dateTime: req.body.dateTime,
                cardLength: req.body.cardLength,
                limitDay: req.body.limitDay,
                copyPath: req.body.copyPath,
                copyDay: req.body.copyDay,
                saveGrade: req.body.saveGrade,
                checkedInt: req.body.checkedInt,
                allowTab: req.body.allowTab,
                wordAlarm: req.body.wordAlarm,
                limitYellow: req.body.limitYellow,
                limitDayDone: req.body.limitDayDone,
                asTime: req.body.asTime,
                calculateAgain: req.body.calculateAgain,
                allMoney: req.body.allMoney,
                changeWho: req.body.changeWho,
                salesPar: req.body.salesPar,
                changeTime: req.body.changeTime
            }
        }, {
            new: true
        })
        .then(system => res.json(system))
        .catch(err => res.json(err))
})
//删除一个药品
router.delete('/system/:id', (req, res) => {
    System.findOneAndRemove({})
        .then(system => res.send(`${system.order}删除成功`))
        .catch(err => res.json(err))
})

module.exports = router
