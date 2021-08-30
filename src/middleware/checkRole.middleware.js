const Account = require('../models/Account.model');
const checkRole = (roles = []) => async (req, res, next) => {
  console.log(`LHA:  ===> file: checkRole.middleware.js ===> line 6 ===> roles`, roles)
  const {
    decodeToken
  } = req.value.body;
  const userId = decodeToken.data;
  console.log(userId);
  const users=await Account.find()
  console.log(`LHA:  ===> file: checkRole.middleware.js ===> line 10 ===> users`, users)
  const user = await Account.findById(userId);
  console.log(`LHA:  ===> file: checkRole.middleware.js ===> line 10 ===> user`, user.role)

  if (user && roles.includes(user.role)) {
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