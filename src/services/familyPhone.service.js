const { DFStatusLoan } = require('../config')
const FAMILY_PHONE = require('../models/FamilyPhone.model')
exports.createFamilyPhoneAsync = (body) => {
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

exports.findAllFamilyPhoneAsync = () => {
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

exports.updateFamilyPhoneAsync = (id, body) => {
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
