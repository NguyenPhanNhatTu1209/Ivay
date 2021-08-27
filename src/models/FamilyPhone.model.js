const mongoose = require('mongoose')
const { defaultModel } = require('../config/defineModel')
const Schema = mongoose.Schema


const FAMILY_PHONE = new Schema({
    CreatorUser:defaultModel.number,

    FamilyRelationship:defaultModel.string,
    PhoneName:defaultModel.string,
    PhoneNumber:defaultModel.string,
    
},{timestamps:true})

module.exports = mongoose.model('FAMILY_PHONE', FAMILY_PHONE)