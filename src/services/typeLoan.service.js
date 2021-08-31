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

function roundPrice(rnum, rlength) {
  var newnumber = Math.ceil(rnum * Math.pow(10, rlength - 1)) / Math.pow(10, rlength - 1);
  var toTenths = newnumber.toFixed(rlength);
  return toTenths;
}

function roundIt(num, precision) {
  var rounder = Math.pow(10, precision);
  return (Math.round(num * rounder) / rounder).toFixed(precision)
};
exports.findTypeLoanClientAsync = async (query) => {
  try {
    let month = {
      $gte: 7
    }
    if (query.money >= 5000000&&query.money<10000000) {
      console.log(query.money)
      month={
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

      const inter = loan.interestRate / 12
      const PV = query.money
      const tienLai=PV*inter

      const a=query.money/loan.monthLoan
      // const IRR = inter / 100

      obj.startTime = new Date()
      obj.endTime = new Date(new Date().setMonth(new Date().getMonth() + Number(loan.monthLoan)))

      // const PMT = (PV * IRR) / (1 - ((1 + IRR) ** (-loan.monthLoan)))
      // const INTERATE = (100 + inter) / 100
      obj.monthlyPaymentAmount = Math.ceil((a+tienLai) / 1000) * 1000
      obj.totalDebit = obj.monthlyPaymentAmount * loan.monthLoan

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