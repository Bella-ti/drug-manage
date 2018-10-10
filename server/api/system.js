const express = require('express')
const router = express.Router()
const System = require('../models/system')

router.get('/system', (req, res) => {
    System.find({})
        .then(system => {
            res.json(system)
        })
        .catch(err => {
            res.json(err)
        })
})

router.get('/system/:id', (req, res) => {
    System.findById(req.params.id)
        .then(system => {
            res.json(system)
        })
        .catch(err => {
            res.json(err)
        })
})

router.post('/system', (req, res) => {
    let system = new System({
        order: req.body.order,
        dateTime: req.body.dateTime,
        cardLength: req.body.cardLength,
        limitDay: req.body.limitDay,
        copyPath: req.body.copyPath,
        copyDay: req.body.copyDay,
        saveGrade: req.body.saveGrade,
        discount: req.body.discount,
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
                discount: req.body.discount,
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

router.delete('/system/:id', (req, res) => {
    System.findOneAndRemove({})
        .then(system => res.send(`${system.order}删除成功`))
        .catch(err => res.json(err))
})

module.exports = router
