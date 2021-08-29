const joi = require('@hapi/joi');
const schemas = {
	createSpendingLoan: joi.object().keys({
		typeLoan: joi.string().regex(/^[a-fA-F0-9]{24}$/),
		totalLoanAmount: joi.number().min(5000000),
	}),
};
module.exports = schemas;
