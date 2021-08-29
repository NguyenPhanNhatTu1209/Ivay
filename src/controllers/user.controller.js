const controller = require('./controller');
const authServices = require('../services/user.services');
const identityServices = require('../services/identityCard.service');
const accountBankServices = require('../services/accountBank.service');
const familyPhoneServices = require('../services/familyPhone.service');
const userServices = require('../services/user.services');
const uploadS3Services = require('../services/uploadS3.service');
const { defaultRoles } = require('../config/defineModel');
exports.findUserByIdAsync = async (req, res, next) => {
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

exports.searchUserAsync = async (req, res, next) => {
	try {
		const id = req.value.params.param;
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

exports.findAllUserAsync = async (req, res, next) => {
	try {
		const query = {
			limit: req.query.limit || 15,
			skip: req.query.skip || 1
		};
		const resServices = await authServices.findAllUser(query);
		if (resServices.success) {
			return controller.sendSuccess(
				res,
				resServices.data,
				200,
				resServices.message
			);
		}
		return controller.sendSuccess(
			res,
			resServices.data,
			300,
			resServices.message
		);
	} catch (error) {
		// bug
		console.log(error);
		return controller.sendError(res);
	}
};

// ==== New Code
exports.createStepUser = async (req, res, next) => {
	try {
		const { decodeToken } = req.value.body;
		const id = decodeToken.data;
		delete req.value.body.decodeToken;
		const payload = Object.assign(
			{
				creatorUser: id
			},
			req.value.body
		);
		const resIdentity = await userServices.createUserAsync(payload);
		if (resServices.success) {
			return controller.sendSuccess(
				res,
				resServices.data,
				200,
				resServices.message
			);
		}
		return controller.sendSuccess(
			res,
			resServices.data,
			300,
			resServices.message
		);
	} catch (error) {
		// bug
		console.log(error);
		return controller.sendError(res);
	}
};

exports.createStepIdentity = async (req, res, next) => {
	try {
		const { decodeToken } = req.value.body;
		const id = decodeToken.data;
		delete req.value.body.decodeToken;
		const payload = Object.assign(
			{
				CreatorUser: id,
				identityCardTB: `IdentityCardFE/${id}`,
				identityCardHold: `IdentityCardHold/${id}`,
				identityCardFE: `IdentityCardTB/${id}`
			},
			req.value.body
		);
		console.log(payload);
		const resServices = await identityServices.createIdentityAsync(payload);
		if (resServices.success) {
			return controller.sendSuccess(
				res,
				resServices.data,
				200,
				resServices.message
			);
		}
		return controller.sendSuccess(
			res,
			resServices.data,
			300,
			resServices.message
		);
	} catch (error) {
		// bug
		console.log(error);
		return controller.sendError(res);
	}
};
exports.uploadStepIdentity = async (req, res, next) => {
	try {
		const { decodeToken } = req.value.body;
		const id = decodeToken.data;
		delete req.value.body.decodeToken;
		const types = req.query.image;
		let arr = [
			{ name: `IdentityCardFE/${id}`, type: types[0] },
			{ name: `IdentityCardHold/${id}`, type: types[1] },
			{ name: `IdentityCardTB/${id}`, type: types[2] }
		];
		data = [];
		for (i of arr) {
			var upload = await uploadS3Services.uploadImageS3(i);
			data.push(upload);
		}
		return controller.sendSuccess(res, data, 200, 'Get link Success');
	} catch (error) {
		// bug
		console.log(error);
		return controller.sendError(res);
	}
};

exports.createStepAccountBank = async (req, res, next) => {
	try {
		const { decodeToken } = req.value.body;
		const id = decodeToken.data;
		delete req.value.body.decodeToken;
		const payload = Object.assign(
			{
				CreatorUser: id
			},
			req.value.body
		);
		const resIdentity = await accountBankServices.createAccountBankAsync(
			payload
		);
		if (resServices.success) {
			return controller.sendSuccess(
				res,
				resServices.data,
				200,
				resServices.message
			);
		}
		return controller.sendSuccess(
			res,
			resServices.data,
			300,
			resServices.message
		);
	} catch (error) {
		// bug
		console.log(error);
		return controller.sendError(res);
	}
};

exports.createStepFamilyPhone = async (req, res, next) => {
	try {
		const { decodeToken } = req.value.body;
		const id = decodeToken.data;
		delete req.value.body.decodeToken;
		const payload = Object.assign(
			{
				CreatorUser: id
			},
			req.value.body
		);
		const resIdentity = await familyPhoneServices.createFamilyPhoneAsync(
			payload
		);
		if (resServices.success) {
			return controller.sendSuccess(
				res,
				resServices.data,
				200,
				resServices.message
			);
		}
		return controller.sendSuccess(
			res,
			resServices.data,
			300,
			resServices.message
		);
	} catch (error) {
		// bug
		console.log(error);
		return controller.sendError(res);
	}
};

exports.updateStepUser = async (req, res, next) => {
	try {
		const { decodeToken } = req.value.body;
		const id = decodeToken.data;
		delete req.value.body.decodeToken;
		const payload = Object.assign(
			{
				CreatorUser: id
			},
			req.value.body
		);
		const resServices = await userServices.updateUserAsync(id, payload);
		if (resServices.success) {
			return controller.sendSuccess(
				res,
				resServices.data,
				200,
				resServices.message
			);
		}
		return controller.sendSuccess(
			res,
			resServices.data,
			300,
			resServices.message
		);
	} catch (error) {
		// bug
		console.log(error);
		return controller.sendError(res);
	}
};
