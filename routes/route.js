const express = require('express')
const router = express.Router()
const restaurants = require('../restaurant.json')

router.get('/', (req, res) => {
  res.render('index', { restaurants: restaurants.results})
})

module.exports = router