const JWTStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const key = process.env.SECRET_KEY || 'defaultSecretKey'
const User = require('../../../models/User')

const opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken()
opts.secretOrKey = key

const userJWTLogin = new JWTStrategy(opts, async (payload, done) => {
    const username = payload.username
    try {
        const user = await User.findOne({ username: username })
        if (!user || user === null) {
            return done(null, false)
        } else {
            return done(null, user)
        }
    } catch (e) {
        return done(error, false)
    }
})

module.exports = userJWTLogin
