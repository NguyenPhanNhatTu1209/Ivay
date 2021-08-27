const mongoose = require('mongoose')
const { defaultModel } = require('../config/defineModel')
const Schema = mongoose.Schema


const USER = new Schema({
    AcademicLevel:defaultModel.number,
    Avatar:defaultModel.string,
    CompanyName:defaultModel.string,

    CurrentAddress:defaultModel.string,
    CreatorUser:defaultModel.stringRef,
    FullAddress:defaultModel.string,
    
    MaritalStatus:defaultModel.number,
    MonthlyIncome:defaultModel.string,
    Profession:defaultModel.string,
    
    Role:defaultModel.number,
    
},{timestamps:true})

module.exports = mongoose.model('USER', USER)