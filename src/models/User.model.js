const mongoose = require('mongoose')
const { defaultModel } = require('../config/defineModel')
const Schema = mongoose.Schema


const USER = new Schema({
    academicLevel:defaultModel.number,
    avatar:defaultModel.string,
    companyName:defaultModel.string,

    currentAddress:defaultModel.string,
    creatorUser:defaultModel.stringRef,
    fullAddress:defaultModel.string,
    
    maritalStatus:defaultModel.number,
    monthlyIncome:defaultModel.string,
    profession:defaultModel.string,
    
    role:defaultModel.number,
    
},{timestamps:true})

module.exports = mongoose.model('USER', USER)