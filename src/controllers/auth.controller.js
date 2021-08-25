const controller = require('./controller');
const authServices = require('../services/user.services');
const uploadServices = require('../services/upload.services');
const { pushNotification } = require('../services/fcmNotify');
const USER = require('../models/User.model');
const ADDRESS = require('../models/Address')
const { defaultRoles } = require('../config/defineModel');
const { converObjectFieldString } = require('../services/helper.services');
const register = async (req, res, next) => {
	try {
		const resServices = await authServices.register(req.value.body);
		const admin =  await USER.findOne({role: defaultRoles.Admin})
		console.log(admin._id);
		if (!resServices.success)
			return controller.sendSuccess(
				res,
				resServices.data,
				300,
				resServices.message
			);
			const dataPush=Object.assign({},{action:"NEW_USER"},JSON.parse(JSON.stringify(resServices.data.user)))
			console.log(dataPush);
			pushNotification(`PT-Ship có khách hàng mới`,`Hãy đặt giá ship cho khách ngay nào`,"",converObjectFieldString(dataPush),admin.fcm)

		return controller.sendSuccess(
			res,
			resServices.data,
			200,
			resServices.message
		);
	} catch (err) {
		return controller.sendError(res);
	}
};
const registerStaff = async (req, res, next) => {
	try {
		const resServices = await authServices.registerStaff(req.value.body);
		if (!resServices.success)
			return controller.sendSuccess(
				res,
				resServices.data,
				300,
				resServices.message
			);
		return controller.sendSuccess(
			res,
			resServices.data,
			200,
			resServices.message
		);
	} catch (err) {
		return controller.sendError(res);
	}
};

const login = async (req, res, next) => {
	try {
		const resServices = await authServices.login(req.value.body);
		if (!resServices.success) {
			return controller.sendSuccess(res, {}, 300, resServices.message);
		}
		return controller.sendSuccess(
			res,
			resServices.data,
			200,
			resServices.message
		);
	} catch (err) {
		return controller.sendError(res);
	}
};
const findUser = async (req, res, next) => {
	try {
		const { decodeToken } = req.value.body;
		const _id = decodeToken.data;
		const resServices = await authServices.findUser(_id);
		return controller.sendSuccess(
			res,
			resServices.data,
			200,
			resServices.message
		);
	} catch (error) {
		// bug
		console.log(error);
		return controller.sendError(res);
	}
};
const searchUser = async (req, res, next) => {
	try {
		const  id  = req.value.params.param;
		const resServices = await authServices.findUser(id);
		return controller.sendSuccess(
			res,
			resServices.data,
			200,
			resServices.message
		);
	} catch (error) {
		// bug
		console.log(error);
		return controller.sendError(res);
	}
};

const changePassword = async (req, res, next) => {
	try {
		const { newPassword, decodeToken } = req.value.body;
		const id = decodeToken.data;
		const resServices = await authServices.changePassword(id, req.body);
		if (!resServices.success) {
			return controller.sendSuccess(
				res,
				resServices.success,
				300,
				resServices.message
			);
		}
		return controller.sendSuccess(
			res,
			resServices.success,
			200,
			resServices.message
		);
	} catch (error) {
		return controller.sendError(res);
	}
};

const updateUser = async (req, res, next) => {
	try {
		const { decodeToken } = req.value.body;
		const id = decodeToken.data;
		console.log(`LHA:  ===> file: auth.controller.js ===> line 56 ===> id`, id);
		let area = await ADDRESS.findOne({code: req.value.body.code});
		console.log(area)
		delete area._id;
		delete area._v;
		let bodyUser = {
			displayName: req.value.body.displayName,
			address: req.value.body.address,
			phone: req.value.body.phone,
			avatar: req.value.body.avatar,
			area: area
		}
		const resServices = await authServices.updateUser(id, bodyUser);
		if (!resServices.success) {
			return controller.sendSuccess(
				res,
				resServices.success,
				300,
				resServices.message
			);
		}

		return controller.sendSuccess(
			res,
			resServices.data,
			200,
			resServices.message
		);
	} catch (error) {
		return controller.sendError(res);
	}
};
const EditStaff = async (req, res, next) => {
	try {
		const id = req.body.id;
		delete req.body.id;
		const resServices = await authServices.updateUser(id, req.body);
		if (!resServices.success) {
			return controller.sendSuccess(
				res,
				resServices.success,
				300,
				resServices.message
			);
		}

		return controller.sendSuccess(
			res,
			resServices.data,
			200,
			resServices.message
		);
	} catch (error) {
		return controller.sendError(res);
	}
};
const findStaff = async (req, res, next) => {
	try {
		const query = {
			limit: req.query.limit || 15,
			skip: req.query.skip || 1
		}
		const resServices = await authServices.findStaff(query);
		return controller.sendSuccess(
			res,
			resServices.data,
			200,
			resServices.message
		);
	} catch (error) {
		// bug
		console.log(error);
		return controller.sendError(res);
	}
};
const resetPasswordAdmin = async (req, res, next) => {
	try {
		const resServices = await authServices.resetPasswordAdmin(req.value.body);
		if (!resServices.success) {
			return controller.sendSuccess(
				res,
				resServices.success,
				300,
				resServices.message
			);
		}
		return controller.sendSuccess(
			res,
			resServices.success,
			200,
			resServices.message
		);
	} catch (error) {
		return controller.sendError(res);
	}
};
const updateImage = async (req, res, next) => {
	try {
    console.log("abc");
		const { decodeToken } = req.value.body;
		const id = decodeToken.data;
		const user = await authServices.findUser(id);
		if (user.success) {
			if (req.files['Image'] != null) {
				let addImage = req.files['Image'][0];
				const urlImage = await uploadServices.UploadImage(addImage.filename, 'Avatars/');
				resultUser = await authServices.updateUser(id,{avatar: urlImage});
        if(resultUser.success)
        {
          return controller.sendSuccess(
            res,
            resultUser.data,
            200,
            resultUser.message
          );
        }
        return controller.sendSuccess(
          res,
          resultUser.success,
          300,
          resultUser.message
        );
			}
    }
		return controller.sendSuccess(
			res,
			"",
			300,
			"Do not User"
		);
	} catch (error) {
		console.log(error)
		return controller.sendError(res);
	}
};
const updateShippingFee = async (req, res, next) => {
	try {
		console.log(req.value.body);
		const resServices = await authServices.updateShippingFee(req.value.body.id, req.value.body);
		if (!resServices.success) {
			return controller.sendSuccess(
				res,
				resServices.success,
				300,
				resServices.message
			);
		}

		return controller.sendSuccess(
			res,
			resServices.data,
			200,
			resServices.message
		);
	} catch (error) {
		return controller.sendError(res);
	}
};
const findAllUser = async (req, res, next) => {
	try {
		const query = {
			limit: req.query.limit || 15,
			skip: req.query.skip || 1
		}
		const resServices = await authServices.findAllUser(query);
		return controller.sendSuccess(
			res,
			resServices.data,
			200,
			resServices.message
		);
	} catch (error) {
		// bug
		console.log(error);
		return controller.sendError(res);
	}
};

module.exports = {
	register,
	login,
	findUser,
	changePassword,
	updateUser,
	findStaff,
	registerStaff,
	resetPasswordAdmin,
  updateImage,
	updateShippingFee,
	findAllUser,
	searchUser,
	EditStaff
};
