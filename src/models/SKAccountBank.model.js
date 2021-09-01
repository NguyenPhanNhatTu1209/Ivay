const mongoose = require('mongoose')
const {
  defaultModel
} = require('../config/defineModel')
const Schema = mongoose.Schema


const SK_ACCOUNT_BANK = new Schema({
  accountNumberBank: defaultModel.string,
  cardBank: defaultModel.string,
  creatorUser: defaultModel.stringRef,
  nameBank: defaultModel.number,
  idLoan: defaultModel.stringRef
}, {
  timestamps: true
})

module.exports = mongoose.model('SK_ACCOUNT_BANK', SK_ACCOUNT_BANK)