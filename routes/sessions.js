const express = require('express')
const router = express.Router()
const sessionController = require('../controllers/sessionController')

router.get('/', function(req, res, next) {
  res.send('respond with a resource')
})

router.post('/new-session', sessionController.newSession)

module.exports = router
