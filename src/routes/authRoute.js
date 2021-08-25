const express = require('express')
const Controller = require('../controllers/auth.controller')
const SchemaValidateAuth = require("../validators/auth.validator")
const SchemaValidateUser = require("../validators/user.validator")
var multer = require("multer");
const path = require("path");
const Validate = require("../validators")
const jwtServices = require("../services/jwt.services")
const { checkRole } = require('../middleware/checkRole.middleware')
const { defaultRoles } = require('../config/defineModel')
const router = express.Router()
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./src/uploads");
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage: storage });
var cpUpload = upload.fields([{ name: 'Image', maxCount: 1 }]);

router.get('/findUser', jwtServices.verify, Controller.findUser)
router.get('/findStaff', jwtServices.verify,checkRole([defaultRoles.Admin]), Controller.findStaff)
router.post('/changePassword', jwtServices.verify, Validate.body(SchemaValidateAuth.changePassword), Controller.changePassword)
router.post('/login', Validate.body(SchemaValidateAuth.login), Controller.login)
router.post('/register', Validate.body(SchemaValidateAuth.register), Controller.register)
router.post('/registerStaff',jwtServices.verify,checkRole([defaultRoles.Admin]),Validate.body(SchemaValidateAuth.registerStaff), Controller.registerStaff)
router.post('/updateUser', jwtServices.verify,Validate.body(SchemaValidateUser.update), Controller.updateUser)
router.post('/resetPassword', jwtServices.verify,checkRole([defaultRoles.Admin]), Validate.body(SchemaValidateAuth.resetPassword), Controller.resetPasswordAdmin)
router.post('/updateImage', jwtServices.verify,cpUpload, Controller.updateImage)
router.post('/updateShippingFee', jwtServices.verify,checkRole([defaultRoles.Admin]),Validate.body(SchemaValidateAuth.updateShippingFee),Controller.updateShippingFee)
router.get('/findAllUser', jwtServices.verify,checkRole([defaultRoles.Admin]), Controller.findAllUser)
router.get('/searchUser/:id', jwtServices.verify,Validate.param(SchemaValidateAuth.searchUser,'id'), Controller.searchUser)
router.post('/editStaff', jwtServices.verify,checkRole([defaultRoles.Admin]), Controller.EditStaff)



module.exports = router