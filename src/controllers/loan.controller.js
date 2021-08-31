const controller = require('./controller');
const loanServices = require('../services/loan.service');
const typeLoanServices = require('../services/typeLoan.service');
const {
	DFStatusLoan
} = require('../config');
const { cloneData } = require('../services/statementInfo.service');
exports.createLoanAsync = async (req, res, next) => {
	try {
		const {
			decodeToken
		} = req.value.body
		const id = decodeToken.data.id
		delete req.value.body.decodeToken
		const payload = Object.assign(req.value.body, {
			creatorUser: id
		})

		const resServices = await loanServices.createLoanAsync(payload);
		if (!resServices.success)
			return controller.sendSuccess(
				res,
				resServices.data,
				300,
				resServices.message
			);

		// const dataPush=Object.assign({},{action:"NEW_USER"},JSON.parse(JSON.stringify(resServices.data.user)))
		// console.log(dataPush);
		// pushNotification(`PT-Ship có khách hàng mới`,`Hãy đặt giá ship cho khách ngay nào`,"",converObjectFieldString(dataPush),admin.fcm)
		// Push notification cho admin
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
		console.log(err)
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
			res, {},
			200,
			resServices.message
		);
	} catch (e) {
		console.log(e)
		return controller.sendError(res)
	}
}


exports.acceptLoanByAdminAsync = async (req, res, next) => {
	try {
		const payload = req.query.id
		const resServices = await loanServices.changeStatusLoanAsync(payload, DFStatusLoan.accept, DFStatusLoan.spending)
		if (!resServices.success) {
			return controller.sendSuccess(res, {}, 300, resServices.message);
		}
		return controller.sendSuccess(
			res, resServices.data,
			200,
			resServices.message
		);
	} catch (e) {
		console.log(e)
		return controller.sendError(res)
	}
}

exports.completeLoanByAdminAsync = async (req, res, next) => {
	try {
		const payload = req.query.id
		const resServices = await loanServices.changeStatusLoanAsync(payload, DFStatusLoan.complete, DFStatusLoan.accept)
		if (!resServices.success) {
			return controller.sendSuccess(res, {}, 300, resServices.message);
		}
		return controller.sendSuccess(
			res, resServices.data,
			200,
			resServices.message
		);
	} catch (e) {
		console.log(e)
		return controller.sendError(res)
	}
}

exports.rejectLoanByAdminAsync = async (req, res, next) => {
	try {
		const payload = req.query.id
		const resServices = await loanServices.changeStatusLoanAsync(payload, DFStatusLoan.reject, DFStatusLoan.spending)
		if (!resServices.success) {
			return controller.sendSuccess(res, {}, 300, resServices.message);
		}
		return controller.sendSuccess(
			res, resServices.data,
			200,
			resServices.message
		);
	} catch (e) {
		console.log(e)
		return controller.sendError(res)
	}
}


exports.findLoanAsync = async (req, res, next) => {
	try {
		const {
			decodeToken
		} = req.value.body;
		const id = decodeToken.data.id;
		const role = decodeToken.data.role
		if (role === 1) {
			const resServices = await loanServices.findAllLoanAsync();
			if (!resServices.success) {
				return controller.sendSuccess(res, {}, 300, resServices.message);
			}
			return controller.sendSuccess(
				res,
				resServices.data,
				200,
				resServices.message
			);
		}
		const resServices = await loanServices.findAllLoanAsync(id);
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
exports.findLoanByStatusAdminAsync = async (req, res, next) => {
	try {
		const query = {
			skip: req.value.query.skip || 0,
			limit: req.value.query.limit || 15

		}
		const resServices = await loanServices.findAllLoanByStatusAsync(Number(req.value.query.status), query);
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

exports.findTypeLoanClient = async (req,res,next) => {
	try {
		const query = {
			skip: req.value.query.skip || 0,
			limit: req.value.query.limit || 15,
			money:req.value.query.money

		}
		const resServices = await typeLoanServices.findTypeLoanClientAsync( query);
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
		console.log(err)
		return controller.sendError(res);
	}
}

exports.abc = async (req, res, next) => {
	try {
		const {
			decodeToken
		} = req.value.body;
		const _id = decodeToken.data.id;
		const resServices = await cloneData(_id)		
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