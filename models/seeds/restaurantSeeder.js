const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const Restaurant = require('../restaurant')
const restaurantList = require('../../restaurant.json').results
const User = require('../user')
const users = require('../../user.json').results

mongoose.connect('mongodb://127.0.0.1/restaurant', { useNewUrlParser: true, useCreateIndex: true })

const db = mongoose.connection

db.on('error', () => {
  console.log('db error')
})

db.once('open', () => {
  console.log('db connected!')
  for (let i = 0, count = 0; i < users.length; i++) {
    const user = User(users[i])
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(user.password, salt, (err, hash) => {
        user.password = hash
        user.save()
      })
    })

    for (let j = i * 3; j < (i + 1) * 3; j++, count++) {
      Restaurant.create({ ...restaurantList[j], userId: user._id })
      if (count === restaurantList.length) return
    }
  }
})
