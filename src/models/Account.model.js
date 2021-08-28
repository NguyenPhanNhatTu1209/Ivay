const mongoose = require('mongoose')
const { defaultModel } = require('../config/defineModel')
const Schema = mongoose.Schema


const ACCOUNT = new Schema({
  password:defaultModel.string,
  phone:defaultModel.stringPhone,
  verify:defaultModel.number
    
},{timestamps:true})

module.exports = mongoose.model('ACCOUNT', ACCOUNT)