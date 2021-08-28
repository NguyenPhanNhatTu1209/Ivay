const joi = require('@hapi/joi');
const schemas = {
	createStepUser: joi.object().keys({
		academicLevel: joi.number().required(),
		companyName: joi.string().min(6).required(),
		currentAddress: joi.string().required(),
		fullAddress: joi.string().required(),
		maritalStatus: joi.number().required(),
		monthlyIncome: joi.string().required(),
		profession: joi.string().required()
	}),

	updateStepUser: joi.object().keys({
		academicLevel: joi.number().required(),
		companyName: joi.string().min(6).required(),
		currentAddress: joi.string().required(),
		fullAddress: joi.string().required(),
		maritalStatus: joi.number().required(),
		monthlyIncome: joi.string().required(),
		profession: joi.string().required()
	}),
	createStepIdentity: joi.object().keys({
		identityCardFEName: joi.string().required(),
		identityCardFENameType: joi.string().required(),
		identityCardHoldName: joi.string().required(),
		identityCardHoldType: joi.string().required(),
		identityCardTBName: joi.string().required(),
		identityCardTBType: joi.string().required(),
		name: joi.string().required(),
		gender: joi.string().required(),
		birthDate: joi.date().required(),
	}),
	uploadStepIdentity: joi.object().keys({
		identityCardFEName: joi.string().required(),
		identityCardFENameType: joi.string().required(),
		identityCardHoldName: joi.string().required(),
		identityCardHoldType: joi.string().required(),
		identityCardTBName: joi.string().required(),
		identityCardTBType: joi.string().required()
	}),
};
module.exports = schemas;


