const joi = require("@hapi/joi")

const schemas = {
  register: joi.object().keys({
    phone: joi.string().required(),
    password: joi.string().min(6).required(),
  }),

  login: joi.object().keys({
    phone: joi.string().min(10).required(),
    password: joi.string().min(6).required()
  }),

  changePassword: joi.object().keys({
    oldPassword: joi.string().min(6).max(16).required(),
    newPassword: joi.string().min(6).max(16).required()
  }),
  resetPassword: joi.object().keys({
    phone: joi.string().required(),
    newPassword: joi.string().min(6).max(16).required()
  }),
  updateShippingFee: joi.object().keys({
    priceShipPTN: joi.number().required(),
    priceShipPTH: joi.number().required(),
    priceShipReceived: joi.number().required(),
    id: joi.string().required(),
  }),
  searchUser: joi.object().keys({
    param: joi.string().required(),
  }),
}


module.exports = schemas