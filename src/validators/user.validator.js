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
		gender: joi.string().required(),
		birthDate: joi.date().required(),
	}),
};
module.exports = schemas;


