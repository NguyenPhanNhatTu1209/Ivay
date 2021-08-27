const { DFStatusLoan } = require('../config')
const IDENTITY_CARD = require('../models/IdentityCard.model')
exports.createIdentityAsync = (body) => {
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

exports.findAllIdentityAsync = () => {
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

exports.updateIdentityAsync = (id, body) => {
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
