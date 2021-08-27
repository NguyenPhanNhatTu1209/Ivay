const ACCOUNT_BANK = require('../models/AccountBank.model')
exports.createAccountBankAsync = async (body) => {
  try {
    const identity = new ACCOUNT_BANK(body)
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

exports.findAllAccountBankAsync = async () => {
  try {
    const identities = await ACCOUNT_BANK.find()
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

exports.updateAccountBankAsync = async (id, body) => {
  try {
    const identity = await ACCOUNT_BANK.findByIdAndUpdate(id, body, {
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