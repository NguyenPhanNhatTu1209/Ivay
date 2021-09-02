const {
  DFStatusTypeLoan
} = require('../config')
const { calcPrice } = require('../helper')
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


exports.findTypeLoanByIdAsync = async (query) => {
  try {
    const typeLoans = await TYPE_LOAN.findOne({
      statusTypeLoan: DFStatusTypeLoan.active,
      _id: query
    })
    if (typeLoans)
      return {
        message: 'Successfully get Type Loan',
        success: true,
        data: typeLoans
      }
    return {
      message: 'fail get Type Loan',
      success: false,
      data: null
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
    let month = {
      $gte: 7
    }
    if (query.money >= 5000000 && query.money < 10000000) {
      console.log(query.money)
      month = {
        $lte: 30
      }
    }
    console.log(month)
    const typeLoans = await TYPE_LOAN.find({
      statusTypeLoan: DFStatusTypeLoan.active,
      monthLoan: month
    }).sort({
      monthLoan: 1
    }).skip(Number(query.skip)).limit(Number(query.limit))
    const result = []
    for (loan of typeLoans) {
      const obj = JSON.parse(JSON.stringify(loan))
      const calc = calcPrice(query.money, loan.monthLoan, loan.interestRate)
      obj.monthlyPaymentAmount = calc.monthlyPaymentAmount
      obj.totalDebit = calc.totalDebit
      obj.startTime = new Date()
      obj.endTime = new Date(new Date().setMonth(new Date().getMonth() + Number(loan.monthLoan)))

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