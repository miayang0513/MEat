const express = require('express')
const router = express.Router()
const { authenticate } = require('../config/auth')
const Restaurant = require('../models/restaurant')

router.get('/', authenticate, (req, res) => {
  Restaurant.find().sort({ name: 'asc' })
    .exec((err, restaurants) => {
      if (err) return console.error(err)
      res.render('index', { restaurants })
    })
})

router.use('/user', require('./user'))
router.use('/auth', require('./thirdPartyAuth'))
router.use('/restaurants', require('./restaurants'))

module.exports = router
