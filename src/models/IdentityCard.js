const mongoose = require('mongoose')
const { defaultModel } = require('../config/defineModel')
const Schema = mongoose.Schema


const IDENTITY_CARD = new Schema({
    birthDate:defaultModel.date,
    creatorUser:defaultModel.stringRef,
    gender:defaultModel.number,
    identityCardFE:defaultModel.string,
    identityCardHold:defaultModel.string,
    identityCardTB:defaultModel.string,
    name:defaultModel.string,
    numberCard:defaultModel.string
    
},{timestamps:true})

module.exports = mongoose.model('IDENTITY_CARD', IDENTITY_CARD)