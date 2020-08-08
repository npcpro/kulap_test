const express = require('express')
const router = express.Router()
const chklogin = require('../middleware/chklogin')
const usersController = require('../controllers/users')


router.post('/register',usersController.register)
router.post('/login',usersController.login)


module.exports = router
