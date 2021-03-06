const mongoose = require('mongoose')
const { defaultModel } = require('../config/defineModel')
const Schema = mongoose.Schema


const SK_FAMILY_PHONE = new Schema({
    creatorUser:defaultModel.stringRef,

    familyRelationship:defaultModel.number,
    phoneName:defaultModel.string,
    phoneNumber:defaultModel.string,
    idLoan:defaultModel.stringRef
},{timestamps:true})

module.exports = mongoose.model('SK_FAMILY_PHONE', SK_FAMILY_PHONE)