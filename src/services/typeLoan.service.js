const {
  DFStatusTypeLoan
} = require('../config')
const TYPE_LOAN = require('../models/TypeLoan.model')
exports.createTypeLoanAsync = async (body) => {
  try {
    const typeLoan = new TYPE_LOAN(body)
    await typeLoan.save()
    return {
      message: 'Successfully create Type Loan',
      success: true,
      data: typeLoan
    }
  } catch (e) {
    console.log(e)
    return {
      message: 'An error occurred',
      success: false
    }
  }
}

exports.findTypeLoanAsync = (query) => {
  try {
    const typeLoans = TYPE_LOAN.find({
      status: DFStatusTypeLoan.active
    }).sort({
      monthLoan: -1
    }).skip(query.skip).limit(query.limit)
    return {
      message: 'Successfully create Type Loan',
      success: true,
      data: typeLoans
    }
  } catch (e) {
    console.log(e)
    return {
      message: 'An error occurred',
      success: false
    }
  }
}