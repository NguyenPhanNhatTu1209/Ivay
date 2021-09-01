const mongoose = require('mongoose')
const { defaultModel } = require('../config/defineModel')
const Schema = mongoose.Schema


const SK_IDENTITY_CARD = new Schema({
    birthDate:defaultModel.date,
    creatorUser:defaultModel.stringRef,
    gender:defaultModel.number,
    identityCardFE:defaultModel.string,
    identityCardHold:defaultModel.string,
    identityCardTB:defaultModel.string,
    name:defaultModel.string,
    numberCard:defaultModel.string,
    idLoan:defaultModel.stringRef
    
},{timestamps:true})

module.exports = mongoose.model('SK_IDENTITY_CARD', SK_IDENTITY_CARD)