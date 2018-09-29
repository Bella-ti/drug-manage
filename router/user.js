const express = require('express')
const router = express.Router()
const User = require('../models/user')

// 查询所有用户
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
// 通过ObjectId查询用户信息
router.get('/user/:id', (req, res) => {
  User.findById(req.params.id)
    .then(user => {
      res.json(user)
    })
    .catch(err => {
      res.json(err)
    })
})
// 添加一个用户
router.post('/user', (req, res) => {
  //User model上的create方法储存数据
  User.create(req.body, (err, user) => {
    if (err) {
      res.json(err)
    } else {
      res.json(user)
    }
  })
  //使用实例的save方法存储数据
  // let User = new User({
  //   order: String,
  //   username: String,
  //   password: String,
  //   type: Number,
  //   info: Object
  // })
  // user.save(User, (err, user) => {
  //   if (err) {
  //     res.json(err)
  //     console.log(err)
  //   } else {
  //     res.json(user)
  //     console.log(user)
  //   }
  // })
})
//更新用户信息
router.put('/user/:id', (req, res) => {
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
        information: req.body.information,
        array: req.body.array
      }
    }, {
      new: true
    })
    .then(user => res.json(user))
    .catch(err => res.json(err))
})
//删除一个用户
router.delete('/user/:id', (req, res) => {
  User.findOneAndRemove({
    _id: req.params.id
  })
    .then(user => res.send(`${user.name}删除成功`))
    .catch(err => res.json(err))
})

module.exports = router
