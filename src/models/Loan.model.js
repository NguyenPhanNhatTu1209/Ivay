const mongoose = require('mongoose')
const {
  defaultModel
} = require('../config/defineModel')
const Schema = mongoose.Schema


const LOAN = new Schema({
  endLoan: defaultModel.date,
  interestRate: defaultModel.number,
  monthLoan: defaultModel.string,

  startLoan: defaultModel.date,
  statusLoan: defaultModel.number,
  totalLoanAmount: defaultModel.number
}, {
  timestamps: true
})

module.exports = mongoose.model('LOAN', LOAN)