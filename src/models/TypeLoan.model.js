const mongoose = require('mongoose')
const { defaultModel } = require('../config/defineModel')
const Schema = mongoose.Schema


const TYPE_LOAN = new Schema({
  nameLoan:defaultModel.string,
  interestRate:defaultModel.number,
  monthLoan:defaultModel.number,
  statusTypeLoan:defaultModel.number
    
},{timestamps:true})

module.exports = mongoose.model('TYPE_LOAN', TYPE_LOAN)