const pkg = require('./package')
const config = require('./server/config/db')
const express = require('express')
const favicon = require('serve-favicon')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const index = require('./router/index')

const drug = require('./router/drug')
const user = require('./router/user')
const system = require('./router/system')
const manufacturer = require('./router/manufacturer')

mongoose.connect(config.mongodb)
mongoose.Promise = global.Promise

const app = express()
const port = process.env.PORT || 3000

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(favicon(__dirname + '/src/assets/favicon.ico'))
app.use(express.static('server'))
app.use('/', index)

app.use('/api', drug)
app.use('/api', user)
app.use('/api', system)
app.use('/api', manufacturer)

app.listen(port, () => {
  console.log(`${pkg.name} listening on port ${port}`)
})

module.exports = app
