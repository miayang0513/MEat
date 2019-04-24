const express = require('express')
const router = express.Router()
const { authenticate } = require('../config/auth')
const restaurants = require('../restaurant.json')

router.get('/', authenticate, (req, res) => {
  res.render('index', { restaurants: restaurants.results })
})

router.use('/user', require('./user'))

module.exports = router
