const mongoose = require('mongoose')
const {
  defaultModel
} = require('../config/defineModel')
const Schema = mongoose.Schema


const DEVICE = new Schema({
  appVersion: defaultModel.string,
  creatorUser: defaultModel.stringPhone,
  deviceModel: defaultModel.string,

  deviceUUid: defaultModel.string,
  fcm: defaultModel.string,
  statusDevice: defaultModel.number

}, {
  timestamps: true
})

module.exports = mongoose.model('DEVICE', DEVICE)