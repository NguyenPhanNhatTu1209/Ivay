const express = require('express')
const controller = require('../controllers/loan.controller')
const validateLoan = require("../validators/loan.validator")
const Validate = require("../validators")
const jwtServices = require("../services/jwt.services")
const RoleInstance = require('../middleware/checkRole.middleware')
const {
  defaultRoles
} = require('../config/defineModel')
const router = express.Router()

router.post('/createLoan', jwtServices.verify, Validate.body(validateLoan.createSpendingLoan), controller.createSpendingLoanAsync)
router.post('/createTypeLoan', jwtServices.verify, RoleInstance.checkRole([defaultRoles.Admin]), Validate.body(validateLoan.createSpendingLoan), controller.createSpendingLoanAsync)
router.get('/typeLoans', controller.findTypeLoanAsync)

module.exports = router