const joi = require('@hapi/joi');
const schemas = {
	createSpendingLoan: joi.object().keys({
		typeLoan: joi.string().regex(/^[a-fA-F0-9]{24}$/),
		totalLoanAmount: joi.number().min(5000000),
	}),
	createTypeLoan:joi.object().keys({
		monthLoan:joi.number(),
		nameLoan:joi.string(),
		interestRate:joi.number(),
	}),
	changeStatus:joi.object().keys({
		id:joi.string().regex(/^[a-fA-F0-9]{24}$/)
	}),
	deletedLoan:joi.object().keys({
		idLoan:joi.string().regex(/^[a-fA-F0-9]{24}$/)
	})
};
module.exports = schemas;
