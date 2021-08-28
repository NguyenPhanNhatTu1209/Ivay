const express = require('express')
const Controller = require('../controllers/user.controller')
const SchemaValidateAuth = require("../validators/user.validator")
const Validate = require("../validators")
const jwtServices = require("../services/jwt.services")
const { checkRole } = require('../middleware/checkRole.middleware')
const { defaultRoles } = require('../config/defineModel')
const router = express.Router()

router.post('/createStepUser', jwtServices.verify,Validate.body(SchemaValidateAuth.createStepUser), Controller.createStepUser)
router.post('/updateStepUser', jwtServices.verify,Validate.body(SchemaValidateAuth.updateStepUser), Controller.updateStepUser)
router.get('/uploadStepIdentity', jwtServices.verify, Controller.uploadStepIdentity)

module.exports = router