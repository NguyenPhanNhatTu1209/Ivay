const userService = require('../services/user.services')
const familyService = require('../services/familyPhone.service')
const accountBankService = require('../services/accountBank.service')
const identityService = require('../services/identityCard.service')

const SK_USER = require('../models/SKUser.model')
const SK_FAMILY_PHONE = require('../models/SKFamilyPhone.model')
const SK_IdentityCard = require('../models/SKIdentityCard')
const SK_BANK = require('../models/SKAccountBank.model')



exports.cloneData = async (id) => {
  //user
  const user = await userService.findUserByCreatorUser({
    creatorUser: id
  })
  //family
  const family = await familyService.findAllFamilyPhoneByCreatorUser({
    creatorUser: id
  })
  //accountBank
  const accountBank = await accountBankService.findAllAccountBankByCreatorUser({
    creatorUser: id
  })
  //identity

  const identity = await identityService.findAllIdentityByCreatorUser({
    creatorUser: id
  })

  const payloadUser = JSON.parse(JSON.stringify(user.data))
  payloadUser.creatorUser = id
  delete payloadUser._id

  const skUser = new SK_USER(payloadUser)
  await skUser.save()
  const payloadBank =  JSON.parse(JSON.stringify(accountBank.data))
  delete payloadBank._id
  payloadBank.creatorUser = id


  const skBank = new SK_BANK(payloadBank)
  await skBank.save()

  const payloadFP =  JSON.parse(JSON.stringify(family.data))
 

  for (fp of payloadFP) {
    fp.creatorUser = id
    delete fp._id
    const skFP = new SK_FAMILY_PHONE(fp)
    await skFP.save()
  }


  const payloadID = JSON.parse(JSON.stringify(identity.data))
  delete payloadID._id
  payloadID.creatorUser = id

  const skIC = new SK_IdentityCard(payloadID)
  await skIC.save()

  return {
    message: "LALA",
    data: null,
    success: true
  }
}