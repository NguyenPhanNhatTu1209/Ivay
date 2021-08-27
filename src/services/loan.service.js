const { DFStatusLoan } = require('../config')
const LOAN = require('../models/Loan.model')
exports.createLoanAsync = (body) => {
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

exports.findAllLoanAsync = () => {
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

exports.updateLoanAsync = (id, body) => {
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

exports.deleteLoanAsync=(id)=>{
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

exports.changeStatusLoanAsync=(id,status)=>{
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