const pkg = require('../package')
const config = require('./config/db')
const express = require('express')
// const favicon = require('serve-favicon')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const index = require('./api/index')

const drug = require('./api/drug')
const user = require('./api/user')
const system = require('./api/system')
const manufacturer = require('./api/manufacturer')
const outstock = require('./api/outstock')
const drugsale = require('./api/drugsale')
const stockin = require('./api/stockin')

mongoose.connect(
  config.mongodb,
  { useMongoClient: true }
)
mongoose.Promise = global.Promise

const app = express()
const port = process.env.PORT || 3000

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static('server'))
app.use('/', index)

app.use('/api', drug)
app.use('/api', user)
app.use('/api', system)
app.use('/api', manufacturer)
app.use('/api', outstock)
app.use('/api', drugsale)
app.use('/api', stockin)

app.listen(port, () => {
  console.log(`${pkg.name} listening on port ${port}`)
})

module.exports = app
