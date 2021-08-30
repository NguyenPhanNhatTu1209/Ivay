const mongoose = require('mongoose')
const { defaultModel } = require('../config/defineModel')
const Schema = mongoose.Schema


const FAMILY_PHONE = new Schema({
    creatorUser:defaultModel.stringRef,

    familyRelationship:defaultModel.number,
    phoneName:defaultModel.string,
    phoneNumber:defaultModel.string,
    
},{timestamps:true})

module.exports = mongoose.model('FAMILY_PHONE', FAMILY_PHONE)