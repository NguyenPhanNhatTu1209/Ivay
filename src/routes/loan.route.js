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

router.post('/createLoan', jwtServices.verify, Validate.body(validateLoan.createSpendingLoan), controller.createLoanAsync)
router.post('/createTypeLoan', jwtServices.verify, Validate.body(validateLoan.createTypeLoan), controller.createTypeLoanAsync)
router.get('/typeLoans', controller.findTypeLoanAsync)
router.get('/acceptLoanByAdmin', jwtServices.verify, RoleInstance.checkRole([defaultRoles.Admin]), Validate.query(validateLoan.changeStatus), controller.acceptLoanByAdminAsync)
router.get('/completeLoanByAdmin', jwtServices.verify, RoleInstance.checkRole([defaultRoles.Admin]), Validate.query(validateLoan.changeStatus), controller.completeLoanByAdminAsync)
router.get('/rejectLoanByAdmin', jwtServices.verify, RoleInstance.checkRole([defaultRoles.Admin]), Validate.query(validateLoan.changeStatus), controller.rejectLoanByAdminAsync)
router.get('/getStatusLoan', jwtServices.verify, controller.findLoanAsync)
router.get('/getLoanByStatus', jwtServices.verify, RoleInstance.checkRole([defaultRoles.Admin]), Validate.query(validateLoan.getStatus), controller.findLoanByStatusAdminAsync)
router.get('/getTypeLoanClient', jwtServices.verify, Validate.query(validateLoan.getTypeLoanClient), controller.findTypeLoanClient)
router.get('/getTypeLoanById', jwtServices.verify, controller.findTypeLoanById)
router.get('/getLoanByIdAdmin', jwtServices.verify, RoleInstance.checkRole([defaultRoles.Admin]), controller.findLoanByIdAdminAsync)

// findLoanByIdAdminAsync
module.exports = router