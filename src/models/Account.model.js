const mongoose = require('mongoose')
const { defaultModel } = require('../config/defineModel')
const Schema = mongoose.Schema


const ACCOUNT = new Schema({
  Password:defaultModel.string,
  Phone:defaultModel.stringPhone,
  Verify:defaultModel.number
    
},{timestamps:true})

module.exports = mongoose.model('ACCOUNT', ACCOUNT)