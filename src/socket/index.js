const {
  defaultChatSocket
} = require("../config/defineModel");
const jwt = require('jsonwebtoken')
const chatSocket = require('./chat.socket');
const { configEnv } = require("../config");
const ACCOUNT =require('../models/Account.model');
const DEVICE = require('../models/Device.model')
const USER = require('../models/User.model');


exports.emitToSocketId = (socketId, eventName, data) => {
  console.log(`Emit ${eventName}`, socketId, data);
  global.io.to(`${socketId}`).emit(eventName, data);
};

exports.emitOverChannel = (eventName, data) => {
  console.log(`Emit over channel ${eventName}`, data);
  global.io.emit(eventName, data);
};

exports.emitRoom = (roomId, eventName, data) => {
  console.log(`Emit Room ${roomId}_${eventName}`, data);
  global.io.sockets.in(roomId).emit(eventName, data)
}

exports.findUserById=(socketId)=>{
  return global.listUser.find((e)=>{
    return e.socket===socketId
  });
}
exports.findUserBySocket=(socketId)=>{
  return global.listUser.find((e)=>{
    return e.socket===socketId
  });
}

global.listUser = []

exports.init = async () => {
  global.io.on('connection', async (socket) => {
    console.log("abc");
    const header = socket.handshake.query.token;
    const fcm = socket.handshake.query.fcm; 
    console.log("header: ",header);
    console.log("fcm: ",fcm);

    if (!header) {
      // disconnect socket
      io.sockets.sockets[socket.id].disconnect()
    }
    else{
      const token = header.split(' ')[1];
    jwt.verify(token, configEnv.ACCESS_TOKEN_SECRET, async (err, decodedFromToken) => {
      console.log("err",err)
      if (err) {
              io.sockets.sockets[socket.id].disconnect()
      } else {
        console.log(decodedFromToken.data)
        console.log(global.listUser);
        const account=await ACCOUNT.findById(decodedFromToken.data.id)
        if(account)
        {
          let deviceId;
          socket.on("UPDATE_DEVICE_CSS",async (data)=>{
            const device = await DEVICE.findOne({deviceUUid: data.deviceUUid, creatorUser: account._id})
            if(device!= null)
            {
              deviceId = device._id;
              device.appVersion= data.appVersion,
              device.deviceModel= data.deviceModel,
              device.deviceUUid= data.deviceUUid,
              device.status = 1;
              device.fcm = fcm
              await device.save();
            }
            else
            {
              data.fcm = fcm;
              data.status =1;
              data.creatorUser = account._id;
              const device1= await DEVICE.create(data);
              deviceId = device1._id;
            }
          })
          // await USER.findOneAndUpdate({_id: decodedFromToken.data},{fcm: fcm},{new:true})
          global.listUser.push({socket: socket.id, fcm, userId:decodedFromToken.data,deviceId: deviceId});
          console.log(`LHA:  ===> file: index.js ===> line 62 ===> global.listUser`, global.listUser)
        }
      }
    });
    }


    console.log("connect Socket",global.listUser.length)
    // socket.on(defaultChatSocket.sendMessageCSS,(data)=> chatSocket.chatMessage(socket,data))
    // socket.on(defaultChatSocket.joinRoomCSS, (data) => chatSocket.joinRoom(socket, data))
    // socket.on(defaultChatSocket.leaveRoomCSS, (data) => chatSocket.leaveRoom(socket, data))

    socket.on('disconnect', async function () {
      // let index = global.listUser.findIndex((e)=>{
      //   return e.socket===socket.id
      // });
      // deviceId = global.listUser[index].deviceId;
      const user = findUserBySocket(socket.id);
      if(user)
      {
        await DEVICE.findOneAndUpdate({_id: user.deviceId},{status:0})
      }
      global.listUser=global.listUser.filter(e=>e.socket!==socket.id)
      console.log("Disconnect Socket")
    })
  });
};