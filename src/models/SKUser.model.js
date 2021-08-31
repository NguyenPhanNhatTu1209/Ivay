const mongoose = require('mongoose')
const { defaultModel } = require('../config/defineModel')
const Schema = mongoose.Schema


const SK_USER = new Schema({
    academicLevel:defaultModel.number,
    avatar:defaultModel.string,
    companyName:defaultModel.string,
    quantityChildren: defaultModel.number,
    city: defaultModel.number,
    distric: defaultModel.number,
    creatorUser:defaultModel.stringRef,
    fullAddress:defaultModel.string,
    maritalStatus:defaultModel.number,
    monthlyIncome:defaultModel.number,
    profession:defaultModel.number,    
},{timestamps:true})

module.exports = mongoose.model('SK_USER', SK_USER)