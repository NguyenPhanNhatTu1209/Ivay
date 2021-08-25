const jwt = require('jsonwebtoken')
const { ACCESS_TOKEN_SECRET } = require("../config/index");
const User = require('../models/User.model');
const checkRole = (roles = [])=> async (req, res, next) => {
  const { decodeToken } = req.value.body;
  const userId = decodeToken.data;
  console.log(userId);
  const user = await User.findById(userId);
  if(roles.includes(user.role))
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