const express = require('express')
const router = express.Router()
const User = require('../models/user')

router.get('/user', (req, res) => {
  User.find({})
    .sort({ update_at: -1 })
    .then(users => {
      console.log(users)
      res.json(users)
    })
    .catch(err => {
      res.json(err)
    })
})

router.get('/user/:id', (req, res) => {
  User.findById(req.params.id)
    .then(user => {
      res.json(user)
    })
    .catch(err => {
      res.json(err)
    })
})

router.post('/user', (req, res) => {
  User.create(req.body, (err, user) => {
    if (err) {
      res.json(err)
    } else {
      res.json(user)
    }
  })
})

router.put('/user/:id', (req, res) => {
  console.log(req.body.isAdmin)
  if (req.body.info == undefined) {
    User.findOneAndUpdate({ _id: req.params.id }
      , {
        $set: {
          order: req.body.order,
          username: req.body.username,
          password: req.body.password,
          type: req.body.type,
          isAdmin: req.body.isAdmin,
          information: req.body.information,
          array: req.body.array
        }
      }, {
        new: true
      })
      .then(user => res.json(user))
      .catch(err => res.json(err))
    return
  }
  User.findOneAndUpdate({ _id: req.params.id }
    , {
      $set: {
        order: req.body.order,
        username: req.body.username,
        password: req.body.password,
        type: req.body.type,
        info: {
          address: req.body.info.address,
          phone: req.body.info.phone,
          sayAs: req.body.info.sayAs
        },
        isAdmin: req.body.isAdmin,
        information: req.body.information,
        array: req.body.array
      }
    }, {
      new: true
    })
    .then(user => res.json(user))
    .catch(err => res.json(err))
})

router.delete('/user/:id', (req, res) => {
  User.findOneAndRemove({
    _id: req.params.id
  })
    .then(user => res.send(`${user.name}删除成功`))
    .catch(err => res.json(err))
})

module.exports = router
