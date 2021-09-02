const express = require('express')
const Controller = require('../controllers/auth.controller')
const SchemaValidateAuth = require("../validators/auth.validator")
const Validate = require("../validators")
const jwtServices = require("../services/jwt.services")
const { checkRole } = require('../middleware/checkRole.middleware')
const { defaultRoles } = require('../config/defineModel')
const router = express.Router()

router.post('/changePassword', jwtServices.verify, Validate.body(SchemaValidateAuth.changePassword), Controller.changePasswordAsync)
router.post('/login', Validate.body(SchemaValidateAuth.login), Controller.loginAsync)
router.post('/register', Validate.body(SchemaValidateAuth.register), Controller.registerAsync)
router.get('/exitsPhone', Controller.exitsPhoneAsync)
router.get('/updateCode', jwtServices.verify, checkRole([defaultRoles.Admin]), Controller.updateCodeAdminAsync);



module.exports = router