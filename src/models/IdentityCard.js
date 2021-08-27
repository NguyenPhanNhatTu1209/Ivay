const mongoose = require('mongoose')
const { defaultModel } = require('../config/defineModel')
const Schema = mongoose.Schema


const IDENTITY_CARD = new Schema({
    BirthDate:defaultModel.date,
    CreatorUser:defaultModel.stringRef,
    Gender:defaultModel.number,

    IdentityCardFE:defaultModel.string,
    IdentityCardHold:defaultModel.string,
    IdentityCardTB:defaultModel.string,
    
    Name:defaultModel.string,
    
},{timestamps:true})

module.exports = mongoose.model('IDENTITY_CARD', IDENTITY_CARD)