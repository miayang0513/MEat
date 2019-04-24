const express = require('express')
const router = express.Router()
const User = require('../models/user')
const bcrypt = require('bcryptjs')
/*
prefix: "/user"
*/

router.get('/login', (req, res) => {
  res.render('login')
})

router.post('/login', (req, res) => {
})

router.get('/register', (req, res) => {
  const user = { name: '', email: '', password: '', password2: '' }
  res.render('register', { user })
})

router.post('/register', (req, res) => {
  const { username, email, password, password2 } = req.body
  User.findOne({ email: email }).then(user => {
    if (user) {
      console.log('User already exist')
      res.render('register', { user: req.body })
    } else {
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(password, salt, (err, hash) => {
          const newUser = new User({
            username,
            email,
            password: hash
          })
          newUser.save().then(user => {
            res.redirect('/')
          }).catch(err => console.log(err))
        })
      })
    }
  })
})

module.exports = router
