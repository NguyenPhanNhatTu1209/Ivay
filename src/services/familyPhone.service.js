const { DFStatusLoan } = require('../config')
const FAMILY_PHONE = require('../models/FamilyPhone.model')
const { updateUserAsync } = require('./user.services')
exports.createFamilyPhoneAsync = async (body) => {
  try {
    const familyPhone = new FAMILY_PHONE(body)
    await familyPhone.save()
    return {
      message: 'Successfully update user',
      success: true,
      data: familyPhone
    }
  } catch (e) {
    console.log(e)
    return {
      message: 'An error occurred',
      success: false
    }
  }
}

exports.findAllFamilyPhoneAsync = async () => {
  try {
    const familyPhones = await FAMILY_PHONE.find()
    return {
      message: 'Successfully update user',
      success: true,
      data: familyPhones
    }
  } catch (e) {
    console.log(e)
    return {
      message: 'An error occurred',
      success: false
    }
  }
}

exports.updateFamilyPhoneAsync = async (id, body) => {
  try {
    const familyPhone = await FAMILY_PHONE.findByIdAndUpdate(id, body, {
      new: true
    })
    return {
      message: 'Successfully update user',
      success: true,
      data: familyPhone
    }
  } catch (e) {
    console.log(e)
    return {
      message: 'An error occurred',
      success: false
    }
  }
}
