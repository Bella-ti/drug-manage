const pkg = require('./package')
const config = require('./server/config/db')
const express = require('express')
const favicon = require('serve-favicon')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const index = require('./server/router/index')

const drug = require('./server/router/drug')
const user = require('./server/router/user')
const system = require('./server/router/system')
const manufacturer = require('./server/router/manufacturer')
const outstock = require('./server/router/outstock')
const drugsale = require('./server/router/drugsale')
const stockin = require('./server/router/stockin')

mongoose.connect(config.mongodb)
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
