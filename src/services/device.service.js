
const DEVICE = require('../models/Device.model')
exports.createDeviceAsync = async (body) => {
  try {
    const device = new DEVICE(body)
    await device.save()
    return {
      message: 'Successfully create Device',
      success: true,
      data: device
    }
  } catch (e) {
    console.log(e)
    return {
      message: 'An error occurred',
      success: false
    }
  }
}


exports.findAllDevoceByCreatorUser = async (body) => {
  try {
    const devices = await DEVICE.findOne(body)
    if (!devices) {
      return {
        message: 'Get devices Fail',
        success: false,
        data: null
      };
    }
    return {
      message: 'Successfully get devices',
      success: true,
      data: devices
    }
  } catch (e) {
    console.log(e)
    return {
      message: 'An error occurred',
      success: false
    }
  }
}

exports.updateDeviceAsync = async (id, body) => {
  try {
    console.log(body)
    const device = await DEVICE.findOneAndUpdate({
      _id: id,
      creatorUser: body.creatorUser
    }, body, {
      new: true
    })
    console.log(device);
    return {
      message: 'Successfully update user',
      success: true,
      data: device
    }
  } catch (e) {
    console.log(e)
    return {
      message: 'An error occurred',
      success: false
    }
  }
}
exports._getFcm = async (id) => {
  try {
    const fcm = await DEVICE.findOne({
      creatorUser: id
    }).select("fcm")
    return fcm.fcm
  } catch (e) {
    console.log(e)
    return null
  }
}