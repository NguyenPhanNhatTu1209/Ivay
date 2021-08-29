const ACCOUNT_BANK = require('../models/AccountBank.model');
exports.createAccountBankAsync = async body => {
	try {
		const check = await ACCOUNT_BANK.findOne({ creatorUser: body.creatorUser });
		if (check != null)
			return {
				message: 'AccountBank created',
				success: false
			};
		const identity = new ACCOUNT_BANK(body);
		await identity.save();
		return {
			message: 'Successfully create account Bank',
			success: true,
			data: identity
		};
	} catch (e) {
		console.log(e);
		return {
			message: 'An error occurred',
			success: false
		};
	}
};

exports.findAllAccountBankAsync = async () => {
	try {
		const identities = await ACCOUNT_BANK.find();
		return {
			message: 'Successfully find all account Bank',
			success: true,
			data: identities
		};
	} catch (e) {
		console.log(e);
		return {
			message: 'An error occurred',
			success: false
		};
	}
};
exports.findAllAccountBankByCreatorUser = async (body) => {
	try {
		const identities = await ACCOUNT_BANK.findOne(body,{_id:1,createdAt:0,__v:0,updatedAt:0,creatorUser:0});
		if (!identities) {
			return {
				message: 'Get identities Fail',
				success: false,
				data: null
			};
		}
		return {
			message: 'Successfully find all account Bank',
			success: true,
			data: identities
		};
	} catch (e) {
		console.log(e);
		return {
			message: 'An error occurred',
			success: false
		};
	}
};

exports.updateAccountBankAsync = async (id, body) => {
	try {
		const identity = await ACCOUNT_BANK.findOneAndUpdate(
			{ creatorUser: id },
			body,
			{
				new: true
			}
		);
		return {
			message: 'Successfully update AccountBank',
			success: true,
			data: identity
		};
	} catch (e) {
		console.log(e);
		return {
			message: 'An error occurred',
			success: false
		};
	}
};
