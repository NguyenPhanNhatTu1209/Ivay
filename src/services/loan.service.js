const {
  DFStatusLoan
} = require('../config')
const LOAN = require('../models/Loan.model')
const TYPE_LOAN = require('../models/TypeLoan.model')
const SPENDING_LOAN = require('../models/SpendingLoan.model')
exports.createLoanAsync = async (payload) => {
  try {

    const spendingLoan = await SPENDING_LOAN.findById(payload, {
      _v: 0
    })
    if (spendingLoan) {
      const typeLoan = await TYPE_LOAN.findById(spendingLoan.typeLoan)
      const endTime = new Date().setMonth(new Date().getMonth() - Number(typeLoan.monthLoan))
      const body = {
        totalLoanAmount: spendingLoan.totalLoanAmount,
        typeLoan: spendingLoan.typeLoan,
        creatorUser: spendingLoan.creatorUser,
        startLoan: new Date(),
        endLoan: new Date(endTime),
        statusLoan: DFStatusLoan.active
      }
      // JSON.parse(JSON.stringify(spendingLoan))
      const loan = new LOAN(body)
      await loan.save()
      return {
        message: 'Successfully accept loan',
        success: true,
        data: loan
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

exports.findAllLoanAsync = async () => {
  try {
    const loans = await LOAN.find()
    return {
      message: 'Successfully update user',
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

exports.deleteLoanAsync = async (id) => {
  try {
    const loan = await LOAN.findOneAndUpdate({_id:id,statusLoan:{$ne:DFStatusLoan.deleted}}, {
      statusLoan: DFStatusLoan.deleted
    }, {
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

exports.changeStatusLoanAsync = async (id, status) => {
  try {
    const loan = await LOAN.findByIdAndUpdate(id, {
      statusLoan: status
    }, {
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