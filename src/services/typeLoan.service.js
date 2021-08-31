const {
  DFStatusTypeLoan
} = require('../config')
const TYPE_LOAN = require('../models/TypeLoan.model')
exports.createTypeLoanAsync = async (body) => {
  try {
    body.statusTypeLoan = DFStatusTypeLoan.active
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

exports.findTypeLoanAsync = async (query) => {
  try {
    const typeLoans = await TYPE_LOAN.find({
      statusTypeLoan: DFStatusTypeLoan.active
    }).sort({
      monthLoan: 1
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
exports.findTypeLoanClientAsync = async (query) => {
  try {
    let month = 0
    if (query.money > 5000000) {
      month = 7
    }
    console.log(month)
    const typeLoans = await TYPE_LOAN.find({
      statusTypeLoan: DFStatusTypeLoan.active,
      monthLoan: {
        $gte: month
      }
    }).sort({
      monthLoan: 1
    }).skip(Number(query.skip)).limit(Number(query.limit))
    const result = []
    for (loan of typeLoans) {
      const obj = JSON.parse(JSON.stringify(loan))

      obj.startTime = new Date()
      obj.endTime = new Date().setMonth(new Date().getMonth() + Number(loan.monthLoan))

      obj.totalDebit = Number((Number(query.money) * (100 + loan.interestRate) / 100).toFixed(0))

      obj.monthlyPaymentAmount = Number((obj.totalDebit / loan.monthLoan).toFixed(0));

      result.push(obj)
    }
    return {
      message: 'Successfully create Type Loan',
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