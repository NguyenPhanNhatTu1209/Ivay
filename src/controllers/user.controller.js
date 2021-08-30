const controller = require('./controller');
const authServices = require('../services/user.services');
const identityServices = require('../services/identityCard.service');
const accountBankServices = require('../services/accountBank.service');
const familyPhoneServices = require('../services/familyPhone.service');
const userServices = require('../services/user.services');
userServices;
const uploadS3Services = require('../services/uploadS3.service');
const { defaultRoles } = require('../config/defineModel');

exports.findUserByIdAsync = async (req, res, next) => {
	try {
		const { decodeToken } = req.value.body;
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
		const id = decodeToken.data.id;
		delete req.value.body.decodeToken;
		const payload = Object.assign(
			{
				creatorUser: id
			},
			req.value.body
		);
		const resServices = await userServices.createUserAsync(payload);
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
		const id = decodeToken.data.id;
		delete req.value.body.decodeToken;
		const payload = Object.assign(
			{
				creatorUser: id,
				identityCardTB: `IdentityCardTB/${id}`,
				identityCardHold: `IdentityCardHold/${id}`,
				identityCardFE: `IdentityCardFE/${id}`
			},
			req.value.body
		);
		const resServices = await identityServices.createIdentityAsync(payload);
		if (resServices.success) {
			let arr = [
				resServices.data.identityCardFE,
				resServices.data.identityCardTB,
				resServices.data.identityCardHold
			];
			let arrLink = [];
			for (i of arr) {
				var upload = await uploadS3Services.getImageS3(i);
				arrLink.push(upload);
			}
			var result = {
				gender: resServices.data.gender,
				name: resServices.data.name,
				numberCard: resServices.data.numberCard,
				_id: resServices.data._id,
				creatorUser: resServices.data.creatorUser,
				birthDate: resServices.data.birthDate,
				arrLink: arrLink
			};
			return controller.sendSuccess(res, result, 200, resServices.message);
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
		const id = decodeToken.data.id;
		delete req.value.body.decodeToken;
		const types = req.body.types;
		const images = req.body.images;
		data = [];
		// for (let i=0;i<images.length;i++) {
		// 	if(images[i] == 1)
		// 	{
		// 		`IdentityCardFE/${id}`
		// 	}
		// 	var upload = await uploadS3Services.uploadImageS3(types[i]);
		// 	data.push(upload);
		// }
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
		const id = decodeToken.data.id;
		delete req.value.body.decodeToken;
		const payload = Object.assign(
			{
				creatorUser: id
			},
			req.value.body
		);
		const resServices = await accountBankServices.createAccountBankAsync(
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
		const id = decodeToken.data.id;
		delete req.value.body.decodeToken;
		const payload = Object.assign(
			{
				creatorUser: id
			},
			req.value.body
		);
		const resServices = await familyPhoneServices.createFamilyPhoneAsync(
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
		const id = decodeToken.data.id;
		delete req.value.body.decodeToken;
		const payload = Object.assign(
			{
				creatorUser: id
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
exports.updateStepIdentity = async (req, res, next) => {
	try {
		const { decodeToken } = req.value.body;
		const id = decodeToken.data.id;
		delete req.value.body.decodeToken;
		const payload = Object.assign(
			{
				creatorUser: id
			},
			req.value.body
		);
		const resServices = await identityServices.updateIdentityAsync(id, payload);
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
exports.updateStepAccountBank = async (req, res, next) => {
	try {
		const { decodeToken } = req.value.body;
		const id = decodeToken.data.id;
		delete req.value.body.decodeToken;
		const payload = Object.assign(
			{
				creatorUser: id
			},
			req.value.body
		);
		console.log(id);
		const resServices = await accountBankServices.updateAccountBankAsync(
			id,
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
exports.updateStepFamilyPhone = async (req, res, next) => {
	try {
		const { decodeToken } = req.value.body;
		const id = decodeToken.data.id;
		delete req.value.body.decodeToken;
		const payload = Object.assign(
			{
				creatorUser: id
			},
			req.value.body
		);
		console.log(id);
		const resServices = await familyPhoneServices.updateFamilyPhoneAsync(
			req.value.body.id,
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
exports.getAllInformationUser = async (req, res, next) => {
	try {
		const { decodeToken } = req.value.body;
		const id = decodeToken.data.id;
		console.log(id);
		const payload = { creatorUser: id };
		const account = await userServices.findAccountById(id);
		console.log(account);
		const resServicesUser = await userServices.findUserByCreatorUser(payload);
		const resServicesIdentityCard =
			await identityServices.findAllIdentityByCreatorUser(payload);
		const resServicesFamilyPhone =
			await familyPhoneServices.findAllFamilyPhoneByCreatorUser(payload);
		const resServicesAccountBank =
			await accountBankServices.findAllAccountBankByCreatorUser(payload);
		let identityCardResult;
		let userResult = resServicesUser.data;
		let familyPhoneResult = resServicesFamilyPhone.data;
		let accountBankResult = resServicesAccountBank.data;
		if (resServicesUser.data == null) {
			userResult = '';
		}
		if (resServicesIdentityCard.data == null) identityCardResult = '';
		if (resServicesFamilyPhone.data == null) familyPhoneResult = '';
		if (resServicesAccountBank.data == null) accountBankResult = '';
		if (resServicesIdentityCard.data != null) {
			console.log(resServicesIdentityCard.data);
			let arr = [
				resServicesIdentityCard.data.identityCardFE,
				resServicesIdentityCard.data.identityCardTB,
				resServicesIdentityCard.data.identityCardHold
			];
			let arrLink = [];
			for (let i= 0;i<arr.length;i++) {
				var upload = await uploadS3Services.getImageS3(arr[i]);
				arrLink.push(upload);
			}
			identityCardResult = {
				arrLink: arrLink,
				name: resServicesIdentityCard.data.name,
				gender: resServicesIdentityCard.data.gender,
				birthDate: resServicesIdentityCard.data.birthDate,
				_id: resServicesIdentityCard.data._id,
				numberCard: resServicesIdentityCard.data.numberCard
			};
		} else {
			identityCardResult = '';
		}
		let resServices = {
			idAccount: account.data._id,
			phone: account.data.phone,
			role: account.data.role,
			user: userResult,
			identityCard: identityCardResult,
			familyPhone: familyPhoneResult,
			resServicesAccountBank: accountBankResult
		};
		return controller.sendSuccess(
			res,
			resServices,
			200,
			'Get Infomation User Success'
		);
		// return controller.sendSuccess(
		// 	res,
		// 	resServices.data,
		// 	300,
		// 	resServices.message
		// );
	} catch (error) {
		// bug
		console.log(error);
		return controller.sendError(res);
	}
};
