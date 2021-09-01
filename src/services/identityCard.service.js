const { DFStatusLoan } = require('../config')
const IDENTITY_CARD = require('../models/IdentityCard')
const IDENTITY_CARDSK = require('../models/SKIdentityCard')

exports.createIdentityAsync  = async (body)   =>  {
  try {
    console.log(body.creatorUser)
    const check = await IDENTITY_CARD.findOne({ creatorUser: body.creatorUser });
		if (check != null)
			return {
				message: 'Identity Card created',
				success: false
			};
    const identity = new IDENTITY_CARD(body)
    await identity.save()
    return {
      message: 'Successfully update user',
      success: true,
      data: identity
    }
  } catch (e) {
    console.log(e)
    return {
      message: 'An error occurred',
      success: false
    }
  }
}

exports.findAllIdentityAsync = async () => {
  try {
    const identities = await IDENTITY_CARD.find()
    return {
      message: 'Successfully update user',
      success: true,
      data: identities
    }
  } catch (e) {
    console.log(e)
    return {
      message: 'An error occurred',
      success: false
    }
  }
}
exports.findAllIdentityByCreatorUser = async (body) => {
  try {
    const identities = await IDENTITY_CARD.findOne(body,{_id:1,createdAt:0,__v:0,updatedAt:0,creatorUser:0});
    console.log("identities");
    console.log(identities);
    
    return {
      message: 'Successfully update user',
      success: true,
      data: identities
    }
  } catch (e) {
    console.log(e)
    return {
      message: 'An error occurred',
      success: false
    }
  }
}
exports.findAllIdentityByCreatorUserSK = async (body) => {
  try {
    const identities = await IDENTITY_CARDSK.findOne(body,{_id:1,createdAt:0,__v:0,updatedAt:0});
    console.log("identities");
    console.log(identities);
    
    return {
      message: 'Successfully update user',
      success: true,
      data: identities
    }
  } catch (e) {
    console.log(e)
    return {
      message: 'An error occurred',
      success: false
    }
  }
}

exports.updateIdentityAsync = async (id, body) => {
  try {
    const identity = await IDENTITY_CARD.findOneAndUpdate({creatorUser: id}, body, {
      new: true
    })
    console.log(identity) 
    return {
      message: 'Successfully update user',
      success: true,
      data: identity
    }
  } catch (e) {
    console.log(e)
    return {
      message: 'An error occurred',
      success: false
    }
  }
}
