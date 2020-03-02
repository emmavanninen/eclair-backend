const User = require('../models/User')
const Session = require('../models/Session')
const bcrypt = require('bcryptjs')
const dbErrorMsg = require('../routes/lib/helpers/dbErrorMsg')
const authHelper = require('../routes/lib/helpers/authHelper')

module.exports = {
  newSession: async (req, res) => {
    try {
      let newSession = await new Session({
        createdBy: req.user,
        name: req.body.name,
        description: req.body.description || '',
        password: req.body.password
      })

      await newSession.save()

      res.send({
        message: 'New session successful'
      })
    } catch (e) {
      res.status(500).json(dbErrorMsg(e))
    }
  },
  deleteSession: async (req, res) => {
    const sessionID = req.params.sessionID
    try {
      let session = await Session.findByIdAndDelete(sessionID)

      res.send({
        message: 'Delete successful'
      })
    } catch (e) {
      res.status(500).json(dbErrorMsg(e))
    }
  }
}
