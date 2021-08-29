const { DFStatusLoan } = require('../config')
const LOAN = require('../models/Loan.model')
exports.createLoanAsync =async (body) => {
  try {
    const loan = new LOAN(body)
    await loan.save()
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

exports.findAllLoanAsync =async () => {
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

exports.updateLoanAsync =async (id, body) => {
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

exports.deleteLoanAsync=async(id)=>{
  try {
    const loan = await LOAN.findByIdAndUpdate(id, {statusLoan:DFStatusLoan.inActive}, {
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

exports.changeStatusLoanAsync=async(id,status)=>{
  try {
    const loan = await LOAN.findByIdAndUpdate(id, {statusLoan:status}, {
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