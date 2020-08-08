const express = require('express')
const router = express.Router()
const chklogin = require('../middleware/chklogin')
const usersController = require('../controllers/users')


// router.get('/activate',usersController.activate)
// router.post('/register',usersController.register)
// router.post('/login',usersController.login)
// router.post('/forgotpassword',usersController.forgotPassword)
// router.post('/updatenewpassword',usersController.updateNewPassword)


module.exports = router
