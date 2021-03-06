const USER = require('../models/User.model');
const SKUSER = require('../models/SKUser.model');
const ACCOUNT = require('../models/Account.model');
const bcrypt = require('bcryptjs');
const jwtServices = require('./jwt.services');
const {
	DFRole
} = require('../config');


exports.existPhoneAsync = async query => {
	try {
		const emailExist = await ACCOUNT.findOne({
			phone: query.phone
		});
		if (emailExist)
			return {
				message: 'Phone already exist !!',
				success: true,
				data: false
			};
		return {
			message: 'Phone not exist !!',
			success: true,
			data: true
		};
	} catch (e) {
		console.log(e)
		return {
			message: 'An error occurred',
			success: false
		};
	}

}

exports.registerUserAsync = async body => {
	try {
		const admin = await ACCOUNT.findOne({
			role: defaultRoles.Admin
		})
		const codeAdmin = admin.code;
		const {
			phone,
			password,
			code
		} = body;
		//check if email is already in the database
		const emailExist = await ACCOUNT.findOne({
			phone: phone
		});
		if (emailExist)
			return {
				message: 'Số điện thoại này đã được đăng kí',
				success: false
			};
			if(codeAdmin !=code)
			{
				return {
					message: 'Mã giới thiệu không tồn tại',
					success: false
				};
			}
		const hashedPassword = await bcrypt.hash(password, 8);
		const newUser = new ACCOUNT({
			password: hashedPassword,
			phone: phone
		});
		await newUser.save();
		const generateToken = jwtServices.createToken({id: newUser._id, role: newUser.role});
		//push notification
		return {
			message: 'Successfully Register',
			success: true,
			data: generateToken
		};
	} catch (err) {
		console.log(err);
		return {
			error: 'Lỗi máy chủ, thử lại sau!',
			success: false
		};
	}
};

exports.loginAsync = async body => {
	try {
		const {
			phone,
			password
		} = body;
		const user = await ACCOUNT.findOne({
			phone: phone
		});
		if (!user) {
			return {
				message: 'Invalid Phone !!',
				success: false
			};
		}
		const isPasswordMatch = await bcrypt.compare(password, user.password);
		if (!isPasswordMatch) {
			return {
				message: 'Invalid password !!',
				success: false
			};
		}
		const generateToken = jwtServices.createToken({
			id: user._id,
			role: user.role
		});
		return {
			message: 'Successfully login',
			success: true,
			data: {
				token: generateToken
			}
		};
	} catch (err) {
		console.log(err);

		return {
			message: 'An error occurred',
			success: false
		};
	}
};

exports.findAccountById = async body => {
	try {
		const account = await ACCOUNT.findById(body);
		if (!account) {
			return {
				message: 'Get Account Fail',
				success: false
			};
		}
		return {
			message: 'Successfully Get Account',
			success: true,
			data: account
		};
	} catch (err) {
		return {
			message: 'An error occurred',
			success: false
		};
	}
};

exports.findUserByIdAsync = async body => {
	try {
		const user = await USER.findById(body);
		if (!user) {
			return {
				message: 'Get User Fail',
				success: false
			};
		}
		return {
			message: 'Successfully Get User',
			success: true,
			data: user
		};
	} catch (err) {
		return {
			message: 'An error occurred',
			success: false
		};
	}
};

exports.findUserByCreatorUser = async body => {
	try {
		const user = await USER.findOne(body, {
			_id: 1,
			createdAt: 0,
			__v: 0,
			updatedAt: 0,
			creatorUser: 0
		});
		if (!user) {
			return {
				message: 'Get User Fail',
				success: false,
				data: null
			};
		}
		return {
			message: 'Successfully Get User',
			success: true,
			data: user
		};
	} catch (err) {
		return {
			message: 'An error occurred',
			success: false
		};
	}
};
exports.findUserByCreatorUserSK = async body => {
	try {
		const user = await SKUSER.findOne(body, {
			_id: 1,
			createdAt: 0,
			__v: 0,
			updatedAt: 0,
			creatorUser: 0
		});
		if (!user) {
			return {
				message: 'Get User Fail',
				success: false,
				data: null
			};
		}
		return {
			message: 'Successfully Get User',
			success: true,
			data: user
		};
	} catch (err) {
		return {
			message: 'An error occurred',
			success: false
		};
	}
};

exports.changePasswordAsync = async (id, body) => {
	try {
		const user = await ACCOUNT.findById(id);
		const oldPassword = body.oldPassword;
		const isPasswordMatch = await bcrypt.compare(oldPassword, user.password);
		if (!isPasswordMatch) {
			return {
				message: 'Do not User',
				success: false,
				data: user
			};
		}
		const newPassword = await bcrypt.hash(body.newPassword, 8);
		user.password = newPassword;
		await user.save();
		return {
			message: 'Change Password Successfully',
			success: true
		};
	} catch (error) {
		console.log(error);
		return {
			message: 'An error occurred',
			success: false
		};
	}
};

exports.updateUserAsync = async (id, body) => {
	try {
		const userUpdate = await USER.findOneAndUpdate({
			creatorUser: id
		}, body, {
			new: true
		});
		if (userUpdate) {
			return {
				message: 'Successfully update user',
				success: true,
				data: userUpdate
			};
		}
		return {
			message: 'Fail update user',
			success: false
		};
	} catch (error) {
		return {
			message: 'An error occurred',
			success: false
		};
	}
};


exports.updateCodeAdmin = async (body) => {
	try {
		const userUpdate = await ACCOUNT.findOneAndUpdate({
			role: 1
		}, body, {
			new: true
		});
		if (userUpdate) {
			return {
				message: 'Successfully update Code',
				success: true,
				data: userUpdate
			};
		}
		return {
			message: 'Fail update code',
			success: false
		};
	} catch (error) {
		console.log(error)
		return {
			message: 'An error occurred',
			success: false
		};
	}
};

exports.createUserAsync = async body => {
	try {
		const check = await USER.findOne({
			creatorUser: body.creatorUser
		});
		if (check != null)
			return {
				message: 'User created',
				success: false
			};
		const user = new USER(body);
		await user.save();
		return {
			message: 'Successfully create user',
			success: true,
			data: user
		};
	} catch (e) {
		console.log(e);
		return {
			message: 'An error occurred',
			success: false
		};
	}
};

exports._findAdminByRoleAsync = async () => {
	try {
		const user = await ACCOUNT.findOne({
			role: DFRole.admin
		})
		return user
	} catch (err) {
		console.log(err)
		return null
	}
}