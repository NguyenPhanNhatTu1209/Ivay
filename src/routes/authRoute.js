const express = require('express')
const Controller = require('../controllers/auth.controller')
const SchemaValidateAuth = require("../validators/auth.validator")
const Validate = require("../validators")
const jwtServices = require("../services/jwt.services")
const router = express.Router()

router.post('/changePassword', jwtServices.verify, Validate.body(SchemaValidateAuth.changePassword), Controller.changePasswordAsync)
router.post('/login', Validate.body(SchemaValidateAuth.login), Controller.loginAsync)
router.post('/register', Validate.body(SchemaValidateAuth.register), Controller.registerAsync)
router.get('/exitsPhone', Controller.exitsPhoneAsync)


module.exports = router