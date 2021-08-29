// const {
//   defaultChatSocket
// } = require('../config/defineModel')
// const chatService = require('../services/chat.service')
// const sockets = require('./index')
// const ORDER = require('../models/Order')
// const USER = require('../models/User')
// const PACKAGE = require('../models/Package')
// const User = require('../models/User')
// const {
//   pushNotification
// } = require('../services/fcmNotify')
// const {
//   converObjectFieldString
// } = require('../services/helper.services')

// exports.joinRoom = async (socket, data) => {
//   console.log("Join Room")
//   // const validate = bodySocket(schemaChat.room, data)
//   // if (!validate.success) {
//   //   sockets.emitToSocketId(socket.id, "validate", validate.message)
//   //   return;
//   // }
//   // const {
//   //   idOrder,
//   //   idPackage
//   // } = validate.data
//   const {
//     idOrder,
//     idPackage
//   } = data
//   if (idOrder) {
//     console.log("Room_IDOrder: ", idOrder)
//     socket.Room = idOrder
//     socket.join(idOrder);
//   } else {
//     console.log("Room_IDPackage: ", idPackage)
//     socket.Room = idPackage
//     socket.join(idPackage)
//   }
//   const user = sockets.findUserById(socket.id)
//   await chatService.updateSendByUser({
//     idPackage
//   }, user.userId)
// }
// exports.leaveRoom = (socket, data) => {
//   console.log("Leave Room")
//   // const validate = bodySocket(schemaChat.room, data)
//   // if (!validate.success) {
//   //   sockets.emitToSocketId(socket.id, "validate", validate.message)
//   //   return;
//   // }
//   // const {
//   //   idOrder,
//   //   idPackage
//   // } = validate.data
//   const {
//     idOrder,
//     idPackage
//   } = data

//   if (idOrder) {
//     console.log("Room_IDOrder: ", idOrder)
//     socket.leave(idOrder);
//     socket.removeAllListeners(idOrder);
//     // socket.join(idOrder);
//   } else {
//     console.log("Room_IDPackage: ", idPackage)
//     socket.leave(idPackage);
//     socket.removeAllListeners(idPackage);
//     // socket.join(idPackage)
//   }
//   delete socket.Room
//   // socket.adapter.rooms
// }

// exports.chatMessage = async (socket, data) => {
//   // const validate = bodySocket(schemaChat.chat, data)
//   // if (!validate.success) {
//   //   sockets.emitToSocketId(socket.id,  defaultChatSocket.sendMessageSSC,validate.message)
//   //   return;
//   // }
//   console.log(data)
//   const user = sockets.findUserById(socket.id)
//   if (user) {
//     console.log(`LHA:  ===> file: chat.socket.js ===> line 86 ===> user`, user)
//     const obj = Object.assign(data, {
//       createUser: user.userId,
//       seenByUser: [user.userId]
//     })
//     const message = await chatService.createChat(obj)
//     sockets.emitRoom(socket.Room, defaultChatSocket.sendMessageSSC, message.data)

//     const dataMessage = Object.assign({}, JSON.parse(JSON.stringify(message.data)), {
//       action: "MESSAGE"
//     })
//     if (user.role === 0) { //user 
//       const admin = await USER.findOne({
//         role: 1
//       })
//       const user1 = await USER.findById(user.userId)
//       console.log(`LHA:  ===> file: chat.socket.js ===> line 99 ===> admin`, admin)

//       if (data.idOrder) {
//         const staffOrder = await ORDER.findOne({
//           _id: data.idOrder,
//           status: 3
//         }, {
//           _id: 1,
//           billCode: 1,
//           shipperPackage: 1
//         })
//         const orderCode = await ORDER.findById(data.idOrder).select("billCode")
//         const datafcm = converObjectFieldString(Object.assign(dataMessage, {
//           name: orderCode.billCode
//         }))
//         pushNotification(
//           `Tin nhắn đơn hàng: ${orderCode.billCode}`, //ten cua ai do
//           `${user1.displayName}: ${message.data.content}`,
//           '',
//           datafcm,
//           admin.fcm
//         );
//         if (staffOrder) {
//           console.log(`LHA:  ===> file: chat.socket.js ===> line 111 ===> staffOrder`, staffOrder)
//           if (staffOrder.shipperPackage) {
//             const staff = await USER.findById(staffOrder.shipperPackage)

//             pushNotification(
//               `Tin nhắn đơn hàng: ${orderCode.billCode}`, //ten cua ai do
//               `${user1.displayName}: ${message.data.content}`,
//               '',
//               datafcm,
//               staff.fcm
//             );
//           }
//         }
//       } else {
//         const staffPackage = await PACKAGE.findOne({
//           _id: data.idPackage,
//           status: 1
//         }, {
//           _id: 1,
//           shipperPackage: 1,
//           packageCode: 1
//         })
//         const packageCode = await PACKAGE.findById(data.idPackage).select("packageCode")
//         const datafcm = converObjectFieldString(Object.assign(dataMessage, {
//           name: packageCode.packageCode
//         }))
//         console.log(`LHA:  ===> file: chat.socket.js ===> line 148 ===> packageCode`, packageCode)
//         console.log(`LHA:  ===> file: chat.socket.js ===> line 151 ===> datafcm`, datafcm)
//         console.log(`LHA:  ===> file: chat.socket.js ===> line 157 ===> user1`, user1)
//         pushNotification(
//           `Tin nhắn lô hàng: ${packageCode.packageCode}`, //ten cua ai do
//           `${user1.displayName}: ${message.data.content}`,
//           '',
//           datafcm,
//           admin.fcm
//         );
//         if (staffPackage) {
//           if (staffPackage.packageCode) {
//             const staff = await USER.findById(staffPackage.shipperPackage)
//             pushNotification(
//               `Tin nhắn lô hàng: ${packageCode.packageCode}`, //ten cua ai do
//               ` ${user1.displayName} ${message.data.content}`,
//               '',
//               datafcm,
//               staff.fcm
//             );
//           }
//         }

//       }
//     } else if (user.role === 1) { //admin
//       console.log("Admin")
//       const admin = await USER.findOne({
//         role: 1
//       })
//       const idUser = await PACKAGE.findById(data.idPackage).select("creatorPackage")
//       const userDb = await USER.findById(idUser.creatorPackage)

//       if (data.idOrder) {
//         const staffOrder = await ORDER.findOne({
//           _id: data.idOrder,
//           status: 3
//         }, {
//           _id: 1,
//           billCode: 1,
//           shipperPackage: 1
//         })
//         const orderCode = await ORDER.findById(data.idOrder).select("billCode")
//         const fcmData = converObjectFieldString(Object.assign(dataMessage, {
//           name: orderCode.billCode
//         }))
//         pushNotification(
//           `Tin nhắn đơn hàng: ${orderCode.billCode}`, //ten cua ai do
//           `${admin.displayName}: ${message.data.content}`,
//           '',
//           fcmData,
//           userDb.fcm
//         );
//         if (staffOrder) {
//           console.log(`LHA:  ===> file: chat.socket.js ===> line 180 ===> staffOrder`, staffOrder)
//           if (staffOrder.shipperPackage) {
//             const staff = await USER.findById(staffOrder.shipperPackage)
//             pushNotification(
//               `Tin nhắn đơn hàng: ${orderCode.billCode}`, //ten cua ai do
//               `${admin.displayName}: ${message.data.content}`,
//               '',
//               fcmData,
//               staff.fcm
//             );
//           }
//         }
//       } else {
//         const staffPackage = await PACKAGE.findOne({
//           _id: data.idPackage,
//           status: 1
//         }, {
//           _id: 1,
//           shipperPackage: 1,
//           packageCode: 1
//         })
//         const packageCode = await PACKAGE.findById(data.idPackage).select("packageCode")
//         const fcmData = converObjectFieldString(Object.assign(dataMessage, {
//           name: packageCode.packageCode
//         }))
//         pushNotification(
//           `Tin nhắn lô hàng: ${packageCode.packageCode}`, //ten cua ai do
//           `${admin.displayName}: ${message.data.content}`,
//           '',
//           fcmData,
//           userDb.fcm
//         );
//         if (staffPackage) {

//           if (staffPackage.shipperPackage) {
//             const staff = await USER.findById(staffPackage.shipperPackage)
//             pushNotification(
//               `Tin nhắn lô hàng: ${packageCode.packageCode}`, //ten cua ai do
//               `${admin.displayName}: ${message.data.content}`,
//               '',
//               fcmData,
//               staff.fcm
//             );
//           }
//         }
//       }
//     } else if (user.role === 2) { //staff
//       const staff = await USER.findById(user.userId)

//       const idUser = await PACKAGE.findById(data.idPackage, {
//         _id: 1,
//         creatorPackage: 1
//       })
//       const userDb = await USER.findById(idUser.creatorPackage)
//       const admin = await USER.findOne({
//         role: 1
//       })
//       if (data.idOrder) {
//         const staffOrder = await ORDER.findOne({
//           _id: data.idOrder,
//           status: 3
//         }, {
//           _id: 1,
//           billCode: 1,
//           shipperPackage: 1
//         })
//         const orderCode = await ORDER.findById(data.idOrder).select("billCode")
//         const fcmData = converObjectFieldString(Object.assign(dataMessage, {
//           name: orderCode.billCode
//         }))
//         pushNotification(
//           `Tin nhắn đơn hàng: ${orderCode.billCode}`, //ten cua ai do
//           `${staff.displayName} ${message.data.content}`,
//           '',
//           fcmData,
//           userDb.fcm
//         );
//         if (staffOrder) {
//           pushNotification(
//             `Tin nhắn đơn hàng:  ${orderCode.billCode}`, //ten cua ai do
//             `${staff.displayName} ${message.data.content}`,
//             '',
//             fcmData,
//             admin.fcm
//           );
//         }
//       } else {
//         const staffPackage = await PACKAGE.findOne({
//           _id: data.idPackage,
//           status: 1
//         }, {
//           _id: 1,
//           shipperPackage: 1,
//           packageCode: 1
//         })
//         const packageCode = await PACKAGE.findById(data.idPackage).select("packageCode")
//         const fcmData = converObjectFieldString(Object.assign(dataMessage, {
//           name: packageCode.packageCode
//         }))
//         pushNotification(
//           `Tin nhắn lô hàng: ${packageCode.packageCode}`, //ten cua ai do
//           `${staff.displayName}: ${message.data.content}`,
//           '',
//           fcmData,
//           admin.fcm
//         );
//         if (staffPackage) {
//           console.log(`LHA:  ===> file: chat.socket.js ===> line 319 ===> packageCode`, packageCode)
//           pushNotification(
//             `Tin nhắn lô hàng: ${packageCode.packageCode}`, //ten cua ai do
//             `${staff.displayName}: ${message.data.content}`,
//             '',
//             fcmData,
//             userDb.fcm
//           );

//         }
//       }
//     }
//   } else {
//     sockets.emitToSocketId(socket.id, defaultChatSocket.sendMessageSSC, {
//       message: "Do not find User"
//     })
//   }
// }
exports.a =2;