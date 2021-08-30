const jwt = require('jsonwebtoken')
const { ACCESS_TOKEN_SECRET } = require("../config/index");
const ACCOUNT = require('../models/Account.model');
const checkRole = (roles = [])=> async (req, res, next) => {
  const { decodeToken } = req.value.body;
  const userId = decodeToken.data.id;
  console.log(userId);
  const user = await ACCOUNT.findById(userId);
  if(user&&roles.includes(user.role))
  {
    next();
    return;
  }
  res.status(401).json({
    message: 'Verify Role Failed',
    success: false
  });
};
module.exports = {
  checkRole,
}