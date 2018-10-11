const express = require('express')
const router = express.Router()
const Drugsale = require('../models/drugsale')

router.get('/drugsale', (req, res) => {
  Drugsale.find({})
    .then(drugsale => {
      res.json(drugsale)
    })
    .catch(err => {
      res.json(err)
    })
})

router.get('/drugsale/:id', (req, res) => {
  Drugsale.findById(req.params.id)
    .then(drugsale => {
      res.json(drugsale)
    })
    .catch(err => {
      res.json(err)
    })
})

router.post('/drugsale', (req, res) => {
  Drugsale.create(req.body, (err, drugsale) => {
    if (err) {
      res.json(err)
    } else {
      res.json(drugsale)
    }
  })
})

router.put('/drugsale', (req, res) => {
  Drugsale.findOneAndUpdate(
    { _id: req.params.id },
    {
      $set: {
        orderNumber: req.body.orderNumber,
        saleTime: req.body.saleTime,
        saleMoney: req.body.saleMoney,
        seller: req.body.seller,
        saleInfo: req.body.saleInfo
      }
    },
    {
      new: true
    }
  )
    .then(drugsale => res.json(drugsale))
    .catch(err => res.json(err))
})

router.delete('/drugsale/:id', (req, res) => {
  Drugsale.findOneAndRemove({ _id: req.params.id })
    .then(drugsale => res.send(`${drugsale.order}删除成功`))
    .catch(err => res.json(err))
})

module.exports = router
