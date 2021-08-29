const mongoose = require('mongoose')
const {
  defaultModel
} = require('../config/defineModel')
const Schema = mongoose.Schema


const SPENDING_LOAN = new Schema({
  creatorUser:defaultModel.stringRef,
  typeLoan: defaultModel.stringRef,

  startLoan: defaultModel.date,
  statusLoan: defaultModel.number,
  totalLoanAmount: defaultModel.number
}, {
  timestamps: true
})

module.exports = mongoose.model('SPENDING_LOAN', SPENDING_LOAN)