const { DFStatusLoan } = require('../config')
const IDENTITY_CARD = require('../models/IdentityCard')
exports.createIdentityAsync  = async (body)   =>  {
  try {
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

exports.updateIdentityAsync = async (id, body) => {
  try {
    const identity = await IDENTITY_CARD.findByIdAndUpdate(id, body, {
      new: true
    })
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
