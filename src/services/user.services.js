const USER = require('../models/User.model')
const bcrypt = require('bcryptjs')
const jwtServices = require("./jwt.services")
const { defaultRoles } = require('../config/defineModel')

const register = async (body) => {
  try {
    const {
      phone,
      password,
      displayName
    } = body
    //check if email is already in the database
    const emailExist = await USER.findOne({
      userName: phone
    })
    if (emailExist) return {
      message: 'Phone already exist !!',
      success: false
    }
    const hashedPassword = await bcrypt.hash(password, 8)

    const newUser = new USER({
      displayName:displayName,
      password: hashedPassword,
      userName: phone,
      phone,
      address:'',
      role: defaultRoles.User
    })
    await newUser.save()
    const generateToken = jwtServices.createToken(newUser._id)
    return {
      message: 'Successfully Register',
      success: true,
      data: {
        token: generateToken,
        user: newUser,
      },
    };

  } catch (err) {
    console.log(err);
    return {
      message: 'An error occurred',
      success: false
    }
  }
}
const registerStaff = async (body) => {
  try {
    const {
      phone,
      password,
      displayName
    } = body
    //check if email is already in the database
    const emailExist = await USER.findOne({
      userName: phone
    })
    if (emailExist) return {
      message: 'Phone already exist !!',
      success: false
    }
    const hashedPassword = await bcrypt.hash(password, 8)

    const newUser = new USER({
      displayName:displayName,
      password: hashedPassword,
      userName: phone,
      phone,
      address:'',
      role: defaultRoles.Staff
    })
    await newUser.save()
    return {
      message: 'Successfully registered',
      success: true,
      data: newUser
    };

  } catch (err) {
    console.log(err);
    return {
      message: 'An error occurred',
      success: false
    }
  }
}

const login = async (body) => {
  try {
    const {
      phone,
      password
    } = body
    const user = await USER.findOne({
      userName: phone
    })
    if (!user) {
      return {
        message: 'Invalid userName !!',
        success: false
      }
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password)
    if (!isPasswordMatch) {
      return {
        message: 'Invalid password !!',
        success: false
      }
    }
    const generateToken = jwtServices.createToken(user._id)
    return {
      message: 'Successfully login',
      success: true,
      data: {
        token: generateToken,
        role: user.role,
      },
    };
  } catch (err) {
    return {
      message: 'An error occurred',
      success: false
    }
  }
}

const findUser = async (body) => {
  try {
    const user = await USER.findById(body)
    if (!user) {
      return {
        message: 'Get User Fail',
        success: false
      }
    }
    return {
      message: 'Successfully Get User',
      success: true,
      data: user
    };
  } catch (err) {
    return {
      message: 'An error occurred',
      success: false
    }
  }
}
const findStaff = async (body) => {
  try {
    const staff = await USER.find({role: defaultRoles.Staff}).sort({createdAt: -1}).skip(Number(body.limit) * Number(body.skip) - Number(body.limit)).limit(Number(body.limit));
    if (!staff) {
      return {
        message: 'Get Staff faild',
        success: false
      }
    }
    return {
      message: 'Successfully Get Staff',
      success: true,
      data: staff
    };
  } catch (err) {
    console.log(err)
    return {
      message: 'An error occurred',
      success: false
    }
  }
}
const changePassword = async (id, body) => {
  try {
    const user = await USER.findById(id)
    console.log(`LHA:  ===> file: user.services.js ===> line 109 ===> user`, user)
    const oldPassword = body.oldPassword
    console.log(`LHA:  ===> file: user.services.js ===> line 111 ===> oldPassword`, oldPassword)
    const isPasswordMatch = await bcrypt.compare(oldPassword, user.password)
    console.log(`LHA:  ===> file: user.services.js ===> line 123 ===> user`, user)
    if (!isPasswordMatch) {
      return {
        message: 'Do not User',
        success: false,
        data: user
      }
    }
    const newPassword = await bcrypt.hash(body.newPassword, 8)
    user.password = newPassword
    await user.save()
    return {
      message: 'Change Password Successfully',
      success: true
    }
  } catch (error) {
    console.log(error)
    return {
      message: 'An error occurred',
      success: false
    }
  }
}
const resetPasswordAdmin = async (body) => {
  try {
    const {
      phone,
      newPassword,
    } = body
    const user = await USER.findOne({userName: phone})
    const hashedPassword = await bcrypt.hash(newPassword, 8)
    let bodyUpdate ={
      "password": hashedPassword
    }
    await USER.findByIdAndUpdate(user.id, bodyUpdate)
    return {
      message: 'Reset Password Successfully',
      success: true
    }
  } catch (error) {
    console.log(error)
    return {
      message: 'An error occurred',
      success: false
    }
  }
}



const updateUser = async (id, body) => {
  try {
    const userUpdate = await USER.findByIdAndUpdate(id, body,{new:true})
    if (userUpdate) {
      return {
        message: 'Successfully update user',
        success: true,
        data: userUpdate
      }

    }
    return {
      message: 'Fail update user',
      success: false,
    }
  } catch (error) {
    return {
      message: 'An error occurred',
      success: false
    }
  }
}
const updateShippingFee = async (id, body) => {
  try {
    const userUpdate = await USER.findByIdAndUpdate(id, body,{new:true})
    if (userUpdate) {
      return {
        message: 'Successfully update ShippingFee',
        success: true,
        data: userUpdate
      }

    }
    return {
      message: 'Fail update ShippingFee',
      success: false,
    }
  } catch (error) {
    return {
      message: 'An error occurred',
      success: false
    }
  }
}
const findAllUser = async (body) => {
  try {
    console.log(body.limit);
    const user = await USER.find({role: defaultRoles.User}).sort({createdAt: -1}).skip(Number(body.limit) * Number(body.skip) - Number(body.limit)).limit(Number(body.limit));
    if (!user) {
      return {
        message: 'Get User faild',
        success: false
      }
    }
    return {
      message: 'Successfully Get User',
      success: true,
      data: user
    };
  } catch (err) {
    console.log(err)
    return {
      message: 'An error occurred',
      success: false
    }
  }
}


module.exports = {
  register,
  login,
  findUser,
  changePassword,
  updateUser,
  findStaff,
  registerStaff,
  resetPasswordAdmin,
  updateShippingFee,
  findAllUser
}