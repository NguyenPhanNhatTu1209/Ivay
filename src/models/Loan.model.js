const mongoose = require('mongoose')
const {
  defaultModel
} = require('../config/defineModel')
const Schema = mongoose.Schema


const LOAN = new Schema({
  EndLoan: defaultModel.date,
  InterestRate: defaultModel.number,
  MonthLoan: defaultModel.string,

  StartLoan: defaultModel.date,
  StatusLoan: defaultModel.number,
  TotalLoanAmount: defaultModel.number
}, {
  timestamps: true
})

module.exports = mongoose.model('LOAN', LOAN)