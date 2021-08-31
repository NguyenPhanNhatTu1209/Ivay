const mongoose = require('mongoose')
const { defaultModel } = require('../config/defineModel')
const Schema = mongoose.Schema


const ROOM = new Schema({
  idRoom:defaultModel.string,// id account
  idLastMessage:defaultModel.string,
  name:defaultModel.string,//phone user
  // from: defaultModel.string,
  // reciver:defaultModel.string
},{timestamps:true})

module.exports = mongoose.model('ROOM', ROOM)