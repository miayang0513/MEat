const LocalStrategy = require('passport-local').Strategy
const FacebookStrategy = require('passport-facebook').Strategy
const GoogleStrategy = require('passport-google-oauth20').Strategy
const thirdPartyKey = require('../thirdPartyKey.json')
const User = require('../models/user')
const bcrypt = require('bcryptjs')

module.exports = passport => {
  passport.use(new LocalStrategy({
    usernameField: 'email'
  },
  function (email, password, done) {
    User.findOne({ email: email }).then(user => {
      if (!user) {
        return done(null, false, { type: 'email', msg: 'That email is not register' })
      }
      bcrypt.compare(password, user.password, (err, isMatch) => {
        if (err) throw err

        if (!isMatch) {
          return done(null, false, { type: 'password', msg: 'Password incorrect' })
        }
        return done(null, user)
      })
    })
  }))

  passport.use(
    new FacebookStrategy({
      clientID: thirdPartyKey['Facebook']['clientID'],
      clientSecret: thirdPartyKey['Facebook']['clientSecret'],
      callbackURL: 'http://localhost:3000/auth/facebook/callback',
      profileFields: ['email', 'displayName']
    }, (accessToken, refreshToken, profile, done) => {
      User.findOne({ email: profile._json.email })
        .then(user => {
          if (!user) {
            const randomPassword = Math.random().toString(36).slice(-8)
            bcrypt.genSalt(10, (err, salt) => {
              bcrypt.hash(randomPassword, salt, (err, hash) => {
                const newUser = User({
                  username: profile._json.name,
                  email: profile._json.email,
                  password: hash
                })
                newUser.save().then(user => {
                  return done(null, user)
                }).catch(err => {
                  console.log(err)
                })
              })
            })
          } else {
            return done(null, user)
          }
        })
    })
  )

  passport.use(
    new GoogleStrategy({
      clientID: thirdPartyKey['Google']['clientID'],
      clientSecret: thirdPartyKey['Google']['clientSecret'],
      callbackURL: 'http://localhost:3000/auth/google/callback'
    }, (accessToken, refreshToken, profile, done) => {
      User.findOne({ email: profile._json.email })
        .then(user => {
          if (!user) {
            const randomPassword = Math.random().toString(36).slice(-8)
            bcrypt.genSalt(10, (err, salt) => {
              bcrypt.hash(randomPassword, salt, (err, hash) => {
                const newUser = User({
                  username: profile._json.name,
                  email: profile._json.email,
                  password: hash
                })
                newUser.save().then(user => {
                  return done(null, user)
                }).catch(err => {
                  console.log(err)
                })
              })
            })
          } else {
            return done(null, user)
          }
        })
    })
  )

  passport.serializeUser((user, done) => {
    done(null, user.id)
  })
  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
      done(err, user)
    })
  })
}
