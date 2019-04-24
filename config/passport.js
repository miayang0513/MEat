const LocalStrategy = require('passport-local').Strategy
const User = require('../models/user')
const bcrypt = require('bcryptjs')

module.exports = passport => {
  passport.use(new LocalStrategy({
    usernameField: 'email'
  },
  function (email, password, done) {
    User.findOne({ email: email }).then(user => {
      if (!user) {
        return done(null, false, { message: 'That email s not register' })
      }

      bcrypt.compare(password, user.password, (err, isMatch) => {
        if (err) throw err

        if (!isMatch) {
          return done(null, false, { message: 'Email or Password incorrect' })
        }
        return done(null, user)
      })
    })
  }))
  
  passport.serializeUser((user, done) => {
    done(null, user.id)
  })
  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
      done(err, user)
    })
  })
}
