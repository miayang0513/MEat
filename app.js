const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const path = require('path')
const app = express()
const port = 3000

app.set('views', path.join(__dirname, '/views'))
app.set('view engine', 'pug')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))
app.use('/', express.static(path.join(__dirname, 'public')))

app.use('/', require('./routes/route'))

// 設定連線到mongoDB。
mongoose.set('debug', true)
mongoose.connect('mongodb://localhost/restaurant', { useNewUrlParser: true, useCreateIndex: true })

const db = mongoose.connection

db.on('error', () => {
  console.log('mongodb error!')
})

db.once('open', () => {
  console.log('mongodb connected!')
})

app.listen(port, () => {
  console.log(`http://localhost:${port}`)
})
