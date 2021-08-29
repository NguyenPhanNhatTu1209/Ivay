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
		name: joi.string().required(),
		gender: joi.number().required(),
		birthDate: joi.date().required(),
	}),
	createStepAccountBank: joi.object().keys({
		accountNumberBank: joi.string().required(),
		cardBank: joi.string().required(),
		nameBank: joi.string().required(),
	}),
	createFamilyPhone: joi.object().keys({
		familyRelationship: joi.string().required(),
		phoneName: joi.string().required(),
		phoneNumber: joi.string().required(),
	}),
	updateFamilyPhone: joi.object().keys({
		id: joi.string().required(),
		familyRelationship: joi.string().required(),
		phoneName: joi.string().required(),
		phoneNumber: joi.string().required(),
	}),
};
module.exports = schemas;


