const express = require('express')
const Controller = require('../controllers/user.controller')
const SchemaValidateAuth = require("../validators/user.validator")
const Validate = require("../validators")
const jwtServices = require("../services/jwt.services")
const { checkRole } = require('../middleware/checkRole.middleware')
const { defaultRoles } = require('../config/defineModel')
const router = express.Router()

router.post('/createStepUser', jwtServices.verify,Validate.body(SchemaValidateAuth.createStepUser), Controller.createStepUser)
router.put('/updateStepUser', jwtServices.verify,Validate.body(SchemaValidateAuth.updateStepUser), Controller.updateStepUser)
router.get('/uploadStepIdentity', jwtServices.verify, Controller.uploadStepIdentity)
router.post('/createStepIdentity', jwtServices.verify,Validate.body(SchemaValidateAuth.createStepIdentity), Controller.createStepIdentity)
router.put('/updateStepIdentity', jwtServices.verify,Validate.body(SchemaValidateAuth.createStepIdentity), Controller.updateStepIdentity)
router.post('/createStepAccountBank', jwtServices.verify,Validate.body(SchemaValidateAuth.createStepAccountBank), Controller.createStepAccountBank)
router.put('/updateStepAccountBank', jwtServices.verify,Validate.body(SchemaValidateAuth.createStepAccountBank), Controller.updateStepAccountBank)
router.post('/createStepFamilyPhone', jwtServices.verify,Validate.body(SchemaValidateAuth.createFamilyPhone), Controller.createStepFamilyPhone)
router.put('/updateStepFamilyPhone', jwtServices.verify,Validate.body(SchemaValidateAuth.updateFamilyPhone), Controller.updateStepFamilyPhone)
router.get('/getInformation', jwtServices.verify, Controller.getAllInformationUser)
module.exports = router