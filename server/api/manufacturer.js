const express = require('express')
const router = express.Router()
const Manufacturer = require('../models/manufacturer')

router.get('/manufacturer', (req, res) => {
  Manufacturer.find({})
    .then(manufacturer => {
      res.json(manufacturer)
    })
    .catch(err => {
      res.json(err)
    })
})

router.get('/manufacturer/:id', (req, res) => {
  Manufacturer.findById(req.params.id)
    .then(manufacturer => {
      res.json(manufacturer)
    })
    .catch(err => {
      res.json(err)
    })
})

router.post('/manufacturer', (req, res) => {
  Manufacturer.create(req.body, (err, manufacturer) => {
    if (err) {
      res.json(err)
    } else {
      res.json(manufacturer)
    }
  })
})

router.put('/manufacturer', (req, res) => {
  Manufacturer.findOneAndUpdate(
    { _id: req.params.id },
    {
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
    },
    {
      new: true
    }
  )
    .then(manufacturer => res.json(manufacturer))
    .catch(err => res.json(err))
})

router.delete('/manufacturer/:id', (req, res) => {
  Manufacturer.findOneAndRemove({ _id: req.params.id })
    .then(manufacturer => res.send(`${manufacturer.order}删除成功`))
    .catch(err => res.json(err))
})

module.exports = router
