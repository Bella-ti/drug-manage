const express = require('express')
const router = express.Router()
const User = require('../models/user')
// 获取所有用户信息
router.get('/user', (req, res) => {
  User.find({})
    .sort({ update_at: -1 })
    .then(users => {
      res.json(users)
    })
    .catch(err => {
      res.json(err)
    })
})
// 获取单个用户信息
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
// 修改用户信息
router.put('/user/:id', (req, res) => {
  console.log(req.body.isAdmin)
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
})
// 删除一个用户
router.delete('/user/:id', (req, res) => {
  User.findOneAndRemove({
    _id: req.params.id
  })
    .then(user => res.send(`${user.name}删除成功!`))
    .catch(err => res.json(err))
})

module.exports = router
