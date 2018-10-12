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

router.delete('/outstock/:id', (req, res) => {
  Outstock.findOneAndRemove({ _id: req.params.id })
    .then(outstock => res.send(`${outstock.order}删除成功`))
    .catch(err => res.json(err))
})

module.exports = router
