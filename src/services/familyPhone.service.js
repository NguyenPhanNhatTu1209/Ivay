const FAMILY_PHONE = require('../models/FamilyPhone.model')
const FAMILY_PHONESK = require('../models/SKFamilyPhone.model')
exports.createFamilyPhoneAsync = async (body) => {
  try {
    const familyPhone = new FAMILY_PHONE(body)
    await familyPhone.save();
    const getFamilyPhones= await FAMILY_PHONE.find({
      creatorUser: familyPhone.creatorUser
    })
    return {
      message: 'Successfully update user',
      success: true,
      data: getFamilyPhones
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
    const familyPhones = await FAMILY_PHONE.find(body,{_id:1,createdAt:0,__v:0,updatedAt:0,creatorUser:0})
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
exports.findAllFamilyPhoneByCreatorUserSK = async (body) => {
  try {
    const familyPhones = await FAMILY_PHONESK.find(body,{_id:1,createdAt:0,__v:0,updatedAt:0,creatorUser:0})
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
    console.log(body);
    const familyPhone = await FAMILY_PHONE.findOneAndUpdate({_id: id,creatorUser: body.creatorUser}, body, {
      new: true
    })
    const getFamilyPhones= await FAMILY_PHONE.find({
      creatorUser: familyPhone.creatorUser
    })
    return {
      message: 'Successfully update user',
      success: true,
      data: getFamilyPhones
    }
  } catch (e) {
    console.log(e)
    return {
      message: 'An error occurred',
      success: false
    }
  }
}
