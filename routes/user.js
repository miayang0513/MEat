const express = require('express')
const router = express.Router()
const User = require('../models/user')
const bcrypt = require('bcryptjs')
const passport = require('passport')

/*
prefix: "/user"
*/

router.get('/login', (req, res) => {
  res.render('login')
})

router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/user/login'
})
)

// router.post('/login', (req, res, next) => {
//   passport.authenticate('local', {
//     successRedirect: '/',
//     failureRedirect: '/users/login'
//   })(req, res, next)
// })

router.get('/register', (req, res) => {
  const user = { username: '', email: '', password: '', password2: '' }
  res.render('register', { user })
})

router.post('/register', (req, res) => {
  // const user = req.body
  const { username, email, password } = req.body
  User.findOne({ email: email }).then(user => {
    if (user) {
      res.send({ msg: 'The Email is taken. Try another.', status: 401 })
    } else {
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(password, salt, (err, hash) => {
          const newUser = new User({
            username,
            email,
            password: hash
          })
          newUser.save().then(user => {
            res.send({ redirect: '/' })
          }).catch(err => console.log(err))
        })
      })
    }
  })
})

router.get('/logout', (req, res) => {
  // remove req.user and clear the login session
  req.logout()
  res.redirect('/user/login')
})

module.exports = router
