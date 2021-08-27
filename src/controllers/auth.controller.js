const controller = require('./controller');
// const authServices = require('../services/user.services');
const identityServices = require('../services/identityCard.service');
const accountBankServices= require('../services/accountBank.service');
const familyPhoneServices= require('../services/familyPhone.service');
const userServices=require('../services/user.services')

exports.registerAsync = async (req, res, next) => {
	try {
		const resServices = await authServices.register(req.value.body);
		const admin = await USER.findOne({
			role: defaultRoles.Admin
		})
		console.log(admin._id);
		if (!resServices.success)
			return controller.sendSuccess(
				res,
				resServices.data,
				300,
				resServices.message
			);
		const dataPush = Object.assign({}, {
			action: "NEW_USER"
		}, JSON.parse(JSON.stringify(resServices.data.user)))
		console.log(dataPush);
		pushNotification(`PT-Ship có khách hàng mới`, `Hãy đặt giá ship cho khách ngay nào`, "", converObjectFieldString(dataPush), admin.fcm)

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

exports.loginAsync = async (req, res, next) => {
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

exports.findUserByIdAsync = async (req, res, next) => {
	try {
		const {
			decodeToken
		} = req.value.body;
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

exports.changePasswordAsync = async (req, res, next) => {
	try {
		const {
			newPassword,
			decodeToken
		} = req.value.body;
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

exports.updateUserAsync = async (req, res, next) => {
	try {
		const {
			decodeToken
		} = req.value.body;
		const id = decodeToken.data;
		console.log(`LHA:  ===> file: auth.controller.js ===> line 56 ===> id`, id);
		let bodyUser = {
			displayName: req.value.body.displayName,
			address: req.value.body.address,
			phone: req.value.body.phone,
			avatar: req.value.body.avatar,
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
		const id = decodeToken.data;
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
exports.createStepUser= async (req,res,next)=>{
	try {
		const {
			decodeToken
		} = req.value.body;
		const id = decodeToken.data;
		delete req.value.body.decodeToken
		const payload = Object.assign({
			CreatorUser: id
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
		const id = decodeToken.data;
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
		const id = decodeToken.data;
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
		const id = decodeToken.data;
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

exports.updateStepUser=async (req,res,next)=>{
	try {
		const {
			decodeToken
		} = req.value.body;
		const id = decodeToken.data;
		delete req.value.body.decodeToken
		const payload = Object.assign({
			CreatorUser: id
		}, req.value.body)
		const resServices = await userServices.updateUserAsync(id,payload)
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