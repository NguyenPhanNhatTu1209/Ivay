const mongoose = require('mongoose')
const {
  defaultModel
} = require('../config/defineModel')
const Schema = mongoose.Schema


const ACCOUNT = new Schema({
  AppVersion: defaultModel.string,
  CreatorUser: defaultModel.stringPhone,
  DeviceModel: defaultModel.string,

  DeviceUUid: defaultModel.string,
  Fcm: defaultModel.string,
  StatusDevice: defaultModel.number

}, {
  timestamps: true
})

module.exports = mongoose.model('ACCOUNT', ACCOUNT)