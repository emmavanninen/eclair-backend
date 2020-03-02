const mongoose = require('mongoose')
const moment = require('moment')
const Session = require('./Session')
const now = moment()

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        // trims white spaces out
        trim: true,
        unique: true,
        required: 'Email is required'
    },
    username: { type: String, required: 'Username is required' },
    password: {
        type: String,
        required: 'Password is required'
    },
    photo: { type: String, default: '' },
    session: [{ type: mongoose.Schema.ObjectId, ref: 'Session' }],
    created: {
        type: String,
        default: () => {
            const now = moment()
            return now.format('dddd, MMMM Do YYYY, h:mm:ss a')
        }
    }
})

module.exports = mongoose.model('User', UserSchema)
