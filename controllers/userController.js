const User = require('../models/User')
const Session = require('../models/Session')
const bcrypt = require('bcryptjs')
const dbErrorMsg = require('../routes/lib/helpers/dbErrorMsg')
const authHelper = require('../routes/lib/helpers/authHelper')

module.exports = {
    register: async (req, res) => {
        try {
            let newUser = await new User({
                username: req.body.username,
                email: req.body.email,
                password: req.body.password
            })

            let salt = await bcrypt.genSalt(10)
            let hash = await bcrypt.hash(newUser.password, salt)

            newUser.password = hash

            await newUser.save()

            let token = await authHelper.createUserJwtToken(newUser)

            res.send({
                message: 'Register successful',
                token
            })
        } catch (e) {
            res.status(500).json(dbErrorMsg(e))
        }
    }
}
