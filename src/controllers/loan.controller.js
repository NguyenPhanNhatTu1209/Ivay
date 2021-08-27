const controller = require('./controller');
const loanServices = require('../services/user.services');
const uploadServices = require('../services/upload.services');
const { pushNotification } = require('../services/fcmNotify');
const USER = require('../models/User.model');
const ADDRESS = require('../models/Address')
const { defaultRoles } = require('../config/defineModel');
exports.createLoanAsync = async (req, res, next) => {
	try {
		const resServices = await loanServices.createLoanAsync(req.value.body);
		if (!resServices.success)
			return controller.sendSuccess(
				res,
				resServices.data,
				300,
				resServices.message
			);
			// const dataPush=Object.assign({},{action:"NEW_USER"},JSON.parse(JSON.stringify(resServices.data.user)))
			// console.log(dataPush);
			// pushNotification(`PT-Ship có khách hàng mới`,`Hãy đặt giá ship cho khách ngay nào`,"",converObjectFieldString(dataPush),admin.fcm)

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

exports.findAllLoanAsync = async (req, res, next) => {
	try {
		const resServices = await loanServices.findAllLoanAsync();
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
exports.updateLoanAsync = async (req, res, next) => {
	try {
		const { decodeToken } = req.value.body;
		const _id = decodeToken.data;
		const resServices = await loanServices.findByIdAndUpdate(req.value.params.param,req.value.body);
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
exports.deleteLoanAsync = async (req, res, next) => {
	try {
		const  id  = req.value.params.param;
		const resServices = await loanServices.deleteLoanAsync(id);
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

exports.changeStatusLoanAsync = async (req, res, next) => {
	try {
		const { decodeToken } = req.value.body;
		const id = decodeToken.data;
		const resServices = await loanServices.changeStatusLoanAsync(id, req.body);
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
