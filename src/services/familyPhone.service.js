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
exports.findAllFamilyPhoneByCreatorUser = async (body) => {
  try {
    const familyPhones = await FAMILY_PHONE.findOne(body)
    if (!familyPhones) {
			return {
				message: 'Get Family Phone Fail',
				success: false,
				data: null
			};
		}
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
    console.log(body)
    const familyPhone = await FAMILY_PHONE.findOneAndUpdate({_id: id,creatorUser: body.creatorUser}, body, {
      new: true
    })
    console.log(familyPhone);
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
