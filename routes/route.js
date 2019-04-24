const express = require('express')
const router = express.Router()
const restaurants = require('../restaurant.json')

router.get('/', (req, res) => {
  res.render('index', { restaurants: restaurants.results})
})

router.use('/user', require('./user'))

module.exports = router