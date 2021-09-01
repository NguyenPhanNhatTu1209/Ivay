const express = require('express')
const Controller = require('../controllers/auth.controller')
const SchemaValidateAuth = require("../validators/auth.validator")
// const SchemaValidateUser = require("../validators/user.validator")
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

// router.get('/findUser', jwtServices.verify, Controller.findUserByIdAsync)
router.post('/changePassword', jwtServices.verify, Validate.body(SchemaValidateAuth.changePassword), Controller.changePasswordAsync)
router.post('/login', Validate.body(SchemaValidateAuth.login), Controller.loginAsync)
router.post('/register', Validate.body(SchemaValidateAuth.register), Controller.registerAsync)
router.get('/exitsPhone',Controller.exitsPhoneAsync)
router.get('/updateCode', jwtServices.verify,checkRole([defaultRoles.Admin]), Controller.updateCodeAdminAsync);
// router.post('/updateUser', jwtServices.verify,Validate.body(SchemaValidateUser.update), Controller.updateUserAsync)
// router.post('/updateImage', jwtServices.verify,cpUpload, Controller.updateImageAsync)
// router.get('/searchUser/:id', jwtServices.verify,Validate.param(SchemaValidateAuth.searchUser,'id'), Controller.searchUserAsync)



module.exports = router