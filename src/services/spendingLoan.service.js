const { DFStatusLoan } = require('../config')
const SPENDING_LOAN = require('../models/SpendingLoan.model')
exports.createSpendingLoanAsync =async (body) => {
  try {
    const spendingLoan = new SPENDING_LOAN(body)
    await spendingLoan.save()
    return {
      message: 'Successfully update user',
      success: true,
      data: spendingLoan
    }
  } catch (e) {
    console.log(e)
    return {
      message: 'An error occurred',
      success: false
    }
  }
}

exports.findAllSpendingLoanAsync =async () => {
  try {
    const spendingLoan = await SPENDING_LOAN.find()
    return {
      message: 'Successfully update user',
      success: true,
      data: spendingLoan
    }
  } catch (e) {
    console.log(e)
    return {
      message: 'An error occurred',
      success: false
    }
  }
}

exports.updateSpendingLoanAsync =async (id, body) => {
  try {
    const spendingLoan = await SPENDING_LOAN.findByIdAndUpdate(id, body, {
      new: true
    })
    return {
      message: 'Successfully update user',
      success: true,
      data: spendingLoan
    }
  } catch (e) {
    console.log(e)
    return {
      message: 'An error occurred',
      success: false
    }
  }
}

exports.deleteSpendingLoanAsync=async(id)=>{
  try {
    const spendingLoan = await SPENDING_LOAN.findByIdAndUpdate(id, {statusLoan:DFStatusLoan.inActive}, {
      new: true
    })
    return {
      message: 'Successfully update user',
      success: true,
      data: spendingLoan
    }
  } catch (e) {
    console.log(e)
    return {
      message: 'An error occurred',
      success: false
    }
  }
}