const mongoose = require('mongoose')
const moment = require('moment')
const User = require('./User')
const Guest = require('./Guest')
const now = moment()

const SessionSchema = new mongoose.Schema({
  createdBy: [{ type: mongoose.Schema.ObjectId, ref: 'User' }],
  name: { type: String, required: 'Session name is required' },
  description: { type: String, default: '' },
  photo: { type: String, default: '' },
  players: [{ type: mongoose.Schema.ObjectId, ref: 'Guest' }],
  created: {
    type: String,
    default: () => {
      const now = moment()
      return now.format('dddd, MMMM Do YYYY, h:mm:ss a')
    }
  }
})

module.exports = mongoose.model('Session', SessionSchema)
