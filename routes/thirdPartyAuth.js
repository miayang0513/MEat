const express = require('express')
const router = express.Router()
const passport = require('passport')

/*
prefix: "/auth"
*/

router.get('/facebook', passport.authenticate('facebook', { scope: ['email', 'public_profile'] }))

router.get('/facebook/callback',
  passport.authenticate('facebook', {
    successRedirect: '/',
    failureRedirect: '/user/login'
  })
)

router.get('/google', passport.authenticate('google', { scope: ['email', 'profile'] }))

router.get('/google/callback',
  passport.authenticate('google', {
    successRedirect: '/',
    failureRedirect: '/login'
  })
)

module.exports = router
