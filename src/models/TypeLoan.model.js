const mongoose = require('mongoose')
const { defaultModel } = require('../config/defineModel')
const Schema = mongoose.Schema


const TYPE_LOAN = new Schema({
  NameLoan:defaultModel.string,
  InterestRate:defaultModel.string,
  MonthLoan:defaultModel.number,
  StatusTypeLoan:defaultModel.string
    
},{timestamps:true})

module.exports = mongoose.model('TYPE_LOAN', TYPE_LOAN)