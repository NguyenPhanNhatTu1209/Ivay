const {
  DFStatusLoan
} = require('../config')
const LOAN = require('../models/Loan.model')
const TYPE_LOAN = require('../models/TypeLoan.model')
const SPENDING_LOAN = require('../models/SpendingLoan.model')
exports.createLoanAsync = async (payload) => {
  try {
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
  } catch (e) {
    console.log(e)
    return {
      message: 'An error occurred',
      success: false
    }
  }
}

// const 
exports.findAllLoanByStatusAsync = async (query) => {
  try {
    if ([DFStatusLoan.accept, DFStatusLoan.complete].includes(query.status)) {
      const loans = await LOAN.find({
        statusLoan: query.status,
        creatorUser: query.creatorUser
      }).skip(Number(query.skip)).limit(Number(query.limit))
      return {
        message: 'Successfully findAllLoanByStatus',
        success: true,
        data: loans
      }
    } else {
      const loans = await SPENDING_LOAN.find({
        statusLoan: query.status,
        creatorUser: query.creatorUser
      }).skip(Number(query.skip)).limit(Number(query.limit))
      return {
        message: 'Successfully findAllLoanByStatus',
        success: true,
        data: loans
      }
    }


  } catch (e) {
    console.log(e)
    return {
      message: 'An error occurred',
      success: false
    }
  }
}

exports.findAllLoanAsync = async (query) => {
  try {
    const loans = await LOAN.find({
      creatorUser: {
        $regex: query.creatorUser,
        $options: '$i'
      }
    }).sort({
      createAt: -1
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