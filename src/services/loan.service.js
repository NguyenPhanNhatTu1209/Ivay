const ACCOUNT = require('../models/Account.model')
const LOAN = require('../models/Loan.model')
const TYPE_LOAN = require('../models/TypeLoan.model')
const { cloneData } = require('./statementInfo.service')
const userService=require('./user.services')
const familyService=require('./familyPhone.service')
const accountBankService=require('./accountBank.service')
const identityService=require('./identityCard.service')

exports.createLoanAsync = async (payload) => {
  try {
    const exitsLoan = await LOAN.findOne({
      creatorUser: payload.creatorUser,
      statusLoan: {
        $lt: 2
      }
    })
    if (!exitsLoan) {

      const user = await userService.findUserByCreatorUser({
        creatorUser: payload.creatorUser
      })
      //family
      const family = await familyService.findAllFamilyPhoneByCreatorUser({
        creatorUser: payload.creatorUser
      })
      //accountBank
      const accountBank = await accountBankService.findAllAccountBankByCreatorUser({
        creatorUser: payload.creatorUser
      })
      //identity
    
      const identity = await identityService.findAllIdentityByCreatorUser({
        creatorUser: payload.creatorUser
      })

      if(user.success&&family.success&&accountBank.success&&identity.success)
      {
        const typeLoan = await TYPE_LOAN.findById(payload.typeLoan)
        if (typeLoan) {
          const endTime = new Date().setMonth(new Date().getMonth() - Number(typeLoan.monthLoan))
          const body = {
            totalLoanAmount: payload.totalLoanAmount,
            typeLoan: payload.typeLoan,
            creatorUser: payload.creatorUser,
            startLoan: new Date(),
            endLoan: new Date(endTime),
            statusLoan: payload.spending
          }
          const loan = new LOAN(body)
          await loan.save()
          await cloneData(payload.creatorUser)
          return {
            message: 'Successfully accept loan',
            success: true,
            data: loan
          }
        }
        return {
          message: 'Dont find type loan',
          success: false,
        }
      }

      return {
        message: 'Please enter more info',
        success: false,
      }
      
    }
    return {
      message: 'Pay off your debt and then borrow it',
      success: false,
    }
  } catch (e) {
    console.log(e)
    return {
      message: 'An error occurred',
      success: false
    }
  }
}

// const 
exports.findAllLoanByStatusAsync = async (status, query) => {
  try {
    const loansByStatus = await LOAN.find({
      statusLoan: status
    }, {
      _id: 1,
      endLoan: 0,
      createdAt: 0,
      updatedAt: 0,
      __v: 0
    }).sort({
      startLoan: -1
    }).skip(Number(query.skip)).limit(Number(query.limit))
    const result = []
    for (loan of loansByStatus) {
      const user = await ACCOUNT.findById(loan.creatorUser)
      const obj = JSON.parse(JSON.stringify(loan))
      obj.phone = user.phone
      const typeLoan = await TYPE_LOAN.findById(loan.typeLoan)
      obj.nameLoan = typeLoan.nameLoan
      result.push(obj)

    }
    return {
      message: 'Successfully get loan by status',
      success: true,
      data: result
    }

  } catch (e) {
    console.log(e)
    return {
      message: 'An error occurred',
      success: false
    }
  }
}

exports.findAllLoanAsync = async (query = "") => {
  try {
    const loans = await LOAN.find({
      creatorUser: {
        $regex: query,
        $options: '$i'
      }
    }).sort({
      createdAt: -1
    })
    return {
      message: 'Successfully findAllLoanByStatus',
      success: true,
      data: loans
    }
  } catch (e) {
    console.log(e)
    return {
      message: 'An error occurred',
      success: false
    }
  }
}

exports.updateLoanAsync = async (id, body) => {
  try {
    const loan = await LOAN.findByIdAndUpdate(id, body, {
      new: true
    })
    return {
      message: 'Successfully update user',
      success: true,
      data: loan
    }
  } catch (e) {
    console.log(e)
    return {
      message: 'An error occurred',
      success: false
    }
  }
}


exports.changeStatusLoanAsync = async (id, status, preStatus) => {
  try {
    const loan = await LOAN.findOneAndUpdate({
      _id: id,
      statusLoan: preStatus
    }, {
      statusLoan: status
    }, {
      new: true
    })
    if (loan)
      return {
        message: 'Successfully update changeStatus',
        success: true,
        data: loan
      }
    return {
      message: 'Dont find change status',
      success: false,
    }
  } catch (e) {
    console.log(e)
    return {
      message: 'An error occurred',
      success: false
    }
  }
}