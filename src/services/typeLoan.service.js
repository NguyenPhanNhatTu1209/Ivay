const {
  DFStatusTypeLoan
} = require('../config')
const TYPE_LOAN = require('../models/TypeLoan.model')
exports.createTypeLoanAsync = async (body) => {
  try {
    body.statusTypeLoan=DFStatusTypeLoan.active
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

exports.findTypeLoanAsync =async (query) => {
  try {
    const typeLoans =await TYPE_LOAN.find({
      statusTypeLoan: DFStatusTypeLoan.active
    }).sort({
      monthLoan: -1
    }).skip(Number(query.skip)).limit(Number(query.limit))
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