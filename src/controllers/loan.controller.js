const controller = require('./controller');
const loanServices = require('../services/loan.service');
const spendingLoanServices = require('../services/spendingLoan.service')
const typeLoanServices = require('../services/typeLoan.service')
exports.createSpendingLoanAsync = async (req, res, next) => {
	try {
		const {
			decodeToken
		} = req.value.body
		const id = decodeToken.data
		delete req.value.body.decodeToken
		const payload = Object.assign(req.value.body, {
			creatorUser: id
		})

		// const resServices = await spendingLoanServices.createSpendingLoanAsync(payload);
		// if (!resServices.success)
		// 	return controller.sendSuccess(
		// 		res,
		// 		resServices.data,
		// 		300,
		// 		resServices.message
		// 	); 

		// const dataPush=Object.assign({},{action:"NEW_USER"},JSON.parse(JSON.stringify(resServices.data.user)))
		// console.log(dataPush);
		// pushNotification(`PT-Ship có khách hàng mới`,`Hãy đặt giá ship cho khách ngay nào`,"",converObjectFieldString(dataPush),admin.fcm)
		//Push notification cho admin
		// return controller.sendSuccess(
		// 	res,
		// 	resServices.data,
		// 	200,
		// 	resServices.message
		// );
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

exports.findTypeLoanAsync = async (req, res, next) => {
	try {
		const query = {
			skip: req.query.skip || 0,
			limit: req.query.limit || 15
		}
		const resServices = await typeLoanServices.findTypeLoanAsync(query);
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
}

exports.createTypeLoanAsync = async (req, res, next) => {
	try {
		const payload = req.value.body
		const resServices = await typeLoanServices.createTypeLoanAsync(payload)
		if (!resServices.success) {
			return controller.sendSuccess(res, {}, 300, resServices.message);
		}
		return controller.sendSuccess(
			res,
			{},
			200,
			resServices.message
		);
	} catch (e) {
		console.log(e)
		return controller.sendError(res)
	}
}

// exports.createTypeLoanAsync=(req,res,next)=>{
// 	try {
// 		const resServices = await loanServices.findAllLoanAsync();
// 		if (!resServices.success) {
// 			return controller.sendSuccess(res, {}, 300, resServices.message);
// 		}
// 		return controller.sendSuccess(
// 			res,
// 			resServices.data,
// 			200,
// 			resServices.message
// 		);
// 	} catch (err) {
// 		return controller.sendError(res);
// 	}
// }

// exports.findAllLoanAsync = async (req, res, next) => {
// 	try {
// 		const resServices = await loanServices.findAllLoanAsync();
// 		if (!resServices.success) {
// 			return controller.sendSuccess(res, {}, 300, resServices.message);
// 		}
// 		return controller.sendSuccess(
// 			res,
// 			resServices.data,
// 			200,
// 			resServices.message
// 		);
// 	} catch (err) {
// 		return controller.sendError(res);
// 	}
// };
// exports.updateLoanAsync = async (req, res, next) => {
// 	try {
// 		const {
// 			decodeToken
// 		} = req.value.body;
// 		const _id = decodeToken.data;
// 		const resServices = await loanServices.findByIdAndUpdate(req.value.params.param, req.value.body);
// 		return controller.sendSuccess(
// 			res,
// 			resServices.data,
// 			200,
// 			resServices.message
// 		);
// 	} catch (error) {
// 		// bug
// 		console.log(error);
// 		return controller.sendError(res);
// 	}
// };
// exports.deleteLoanAsync = async (req, res, next) => {
// 	try {
// 		const id = req.value.params.param;
// 		const resServices = await loanServices.deleteLoanAsync(id);
// 		return controller.sendSuccess(
// 			res,
// 			resServices.data,
// 			200,
// 			resServices.message
// 		);
// 	} catch (error) {
// 		// bug
// 		console.log(error);
// 		return controller.sendError(res);
// 	}
// };

// exports.changeStatusLoanAsync = async (req, res, next) => {
// 	try {
// 		const {
// 			decodeToken
// 		} = req.value.body;
// 		const id = decodeToken.data;
// 		const resServices = await loanServices.changeStatusLoanAsync(id, req.body);
// 		if (!resServices.success) {
// 			return controller.sendSuccess(
// 				res,
// 				resServices.success,
// 				300,
// 				resServices.message
// 			);
// 		}
// 		return controller.sendSuccess(
// 			res,
// 			resServices.success,
// 			200,
// 			resServices.message
// 		);
// 	} catch (error) {
// 		return controller.sendError(res);
// 	}
// };