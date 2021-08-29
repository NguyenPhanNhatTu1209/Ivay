const mongoose = require('mongoose')
const { defaultModel } = require('../config/defineModel')
const Schema = mongoose.Schema


const ACCOUNT_BANK = new Schema({
  accountNumberBank:defaultModel.string,
  cardBank:defaultModel.string,
  creatorUser:defaultModel.stringRef,
  nameBank:defaultModel.number,    
},{timestamps:true})

module.exports = mongoose.model('ACCOUNT_BANK', ACCOUNT_BANK)