const controller = require('./controller');
const authServices = require('../services/user.services');
const identityServices = require('../services/identityCard.service');
const accountBankServices = require('../services/accountBank.service');
const familyPhoneServices = require('../services/familyPhone.service');
const userServices = require('../services/user.services')
const ACCOUNT = require('../models/Account.model');
const {
	defaultRoles
} = require('../config/defineModel');

exports.exitsPhoneAsync = async (req, res, next) => {
	try {
		const phone=req.query.phone
		const resServices = await userServices.existPhoneAsync({phone});
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
	} catch (e) {
		console.log(err);
		return controller.sendError(res);
	}
}
exports.registerAsync = async (req, res, next) => {
	try {
		const resServices = await authServices.registerUserAsync(req.value.body);
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
		console.log(err);
		return controller.sendError(res);
	}
};

exports.loginAsync = async (req, res, next) => {
	try {
		const resServices = await authServices.loginAsync(req.value.body);
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
		console.log(err)
		return controller.sendError(res);
	}
};
exports.updateCodeAdminAsync = async (req, res, next) => {
	try {
		const code = req.query.code; 
		const resServices = await userServices.updateCodeAdmin({code: code});
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

exports.loginAsync = async (req, res, next) => {
	try {
		const resServices = await authServices.loginAsync(req.value.body);
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
		console.log(err)
		return controller.sendError(res);
	}
};

exports.findUserByIdAsync = async (req, res, next) => {
	try {
		const {
			decodeToken
		} = req.value.body;
		const _id = decodeToken.data.id;
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

exports.changePasswordAsync = async (req, res, next) => {
	try {
		const {
			newPassword,
			decodeToken
		} = req.value.body;
		const id = decodeToken.data.id;
		const resServices = await authServices.changePasswordAsync(id, req.body);
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

exports.updateUserAsync = async (req, res, next) => {
	try {
		const {
			decodeToken
		} = req.value.body;
		const id = decodeToken.data.id;
		console.log(`LHA:  ===> file: auth.controller.js ===> line 56 ===> id`, id);
		let bodyUser = {
			academicLevel: req.value.body.academicLevel,
			companyName: req.value.body.companyName,
			currentAddress: req.value.body.currentAddress,
			fullAddress: req.value.body.fullAddress,
			maritalStatus: req.value.body.maritalStatus,
			monthlyIncome: req.value.body.monthlyIncome,
			profession: req.value.body.profession,
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

exports.updateImageAsync = async (req, res, next) => {
	try {
		console.log("abc");
		const {
			decodeToken
		} = req.value.body;
		const id = decodeToken.data.id;
		const user = await authServices.findUser(id);
		if (user.success) {
			if (req.files['Image'] != null) {
				let addImage = req.files['Image'][0];
				const urlImage = await uploadServices.UploadImage(addImage.filename, 'Avatars/');
				resultUser = await authServices.updateUser(id, {
					avatar: urlImage
				});
				if (resultUser.success) {
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

exports.findAllUserAsync = async (req, res, next) => {
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


// ==== New Code
exports.createStepUser = async (req, res, next) => {
	try {
		const {
			decodeToken
		} = req.value.body;
		const id = decodeToken.data.id;
		delete req.value.body.decodeToken
		const payload = Object.assign({
			creatorUser: id
		}, req.value.body)
		const resIdentity = await userServices.createUserAsync(payload)
		return controller.sendSuccess(
			res,
			resIdentity.data,
			200,
			resIdentity.message
		);
	} catch (error) {
		// bug
		console.log(error);
		return controller.sendError(res);
	}
}

exports.createStepIdentity = async (req, res, next) => {
	try {
		const {
			decodeToken
		} = req.value.body;
		const id = decodeToken.data.id;
		delete req.value.body.decodeToken
		const payload = Object.assign({
			CreatorUser: id
		}, req.value.body)
		const resIdentity = await identityServices.createIdentityAsync(payload)
		return controller.sendSuccess(
			res,
			resIdentity.data,
			200,
			resIdentity.message
		);
	} catch (error) {
		// bug
		console.log(error);
		return controller.sendError(res);
	}
}

exports.createStepAccountBank = async (req, res, next) => {
	try {
		const {
			decodeToken
		} = req.value.body;
		const id = decodeToken.data.id;
		delete req.value.body.decodeToken
		const payload = Object.assign({
			CreatorUser: id
		}, req.value.body)
		const resIdentity = await accountBankServices.createAccountBankAsync(payload)
		return controller.sendSuccess(
			res,
			resIdentity.data,
			200,
			resIdentity.message
		);
	} catch (error) {
		// bug
		console.log(error);
		return controller.sendError(res);
	}
}

exports.createStepFamilyPhone = async (req, res, next) => {
	try {
		const {
			decodeToken
		} = req.value.body;
		const id = decodeToken.data.id;
		delete req.value.body.decodeToken
		const payload = Object.assign({
			CreatorUser: id
		}, req.value.body)
		const resIdentity = await familyPhoneServices.createFamilyPhoneAsync(payload)
		return controller.sendSuccess(
			res,
			resIdentity.data,
			200,
			resIdentity.message
		);
	} catch (error) {
		// bug
		console.log(error);
		return controller.sendError(res);
	}
}

exports.updateStepUser = async (req, res, next) => {
	try {
		const {
			decodeToken
		} = req.value.body;
		const id = decodeToken.data.id;
		delete req.value.body.decodeToken
		const payload = Object.assign({
			CreatorUser: id
		}, req.value.body)
		const resServices = await userServices.updateUserAsync(id, payload)
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
}