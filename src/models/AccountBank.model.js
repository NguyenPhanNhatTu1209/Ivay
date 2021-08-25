const mongoose = require('mongoose')
const { defaultModel } = require('../config/defineModel')
const Schema = mongoose.Schema


const ACCOUNT_BANK = new Schema({
  AccountNumberBank:defaultModel.string,
  CardBank:defaultModel.string,
  CreatorUser:defaultModel.number,
  NameBank:defaultModel.string
    
},{timestamps:true})

module.exports = mongoose.model('ACCOUNT_BANK', ACCOUNT_BANK)