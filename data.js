const axios = require('axios')
const config = require('./config/db')
const mongoose = require('mongoose')
mongoose.connect(config.mongodb)
const userSchema = new mongoose.Schema({
  order: {
    type: String,
    required: true
  },
  username: String,
  password: String,
  type: Number,
  information: Null,
  array: Object
})
const User = mongoose.model("User", userSchema)

const jsonBird = "https://localhost:3000/api/user"

function fetchData(count) {
  const url = jsonBird
  axios.get(url)
    .then(res => {
      console.log(res)
      const subjects = res.data.subjects
      subjects.map(subject => {
        let user = {
          order: subject.order,
          username: subject.username,
          password: subject.password,
          type: subject.type,
          information: subject.info,
          array: subject.array
        }
        User.create(user, (err, user) => {
          if (err) { console.log(err) }
          console.log(user.username, '--------')
        })
      })
    })
    .catch((err) => {
      throw err
    })
}

fetchData(5)
