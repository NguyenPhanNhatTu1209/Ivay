const joi = require('@hapi/joi');
const schemas = {
	createStepUser: joi.object().keys({
		academicLevel: joi.number().required(),
		companyName: joi.string().required(),
		quantityChildren:joi.number().required(),
		city:joi.number().required(),
		distric:joi.number().required(),
		fullAddress: joi.string().required(),
		maritalStatus: joi.number().required(),
		monthlyIncome: joi.number().required(),
		profession: joi.number().required(),
	}),

	updateStepUser: joi.object().keys({
		academicLevel: joi.number().required(),
		companyName: joi.string().required(),
		quantityChildren:joi.number().required(),
		city:joi.number().required(),
		distric:joi.number().required(),
		fullAddress: joi.string().required(),
		maritalStatus: joi.number().required(),
		monthlyIncome: joi.number().required(),
		profession: joi.number().required(),
	}),
	createStepIdentity: joi.object().keys({
		name: joi.string().required(),
		gender: joi.number().required(),
		birthDate: joi.date().required(),
		numberCard: joi.number().required()
	}),
	createStepAccountBank: joi.object().keys({
		accountNumberBank: joi.string().required(),
		cardBank: joi.string().required(),
		nameBank: joi.number().required(),
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


