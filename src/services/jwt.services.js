const jwt = require('jsonwebtoken')
const { ACCESS_TOKEN_SECRET } = require("../config/index")
const verify = (req, res, next) => {
	const header = req.headers.authorization;
  // console.log(`LHA:  ===> file: jwt.services.js ===> line 5 ===> header`, header)
  
	if (!header) {
		res.status(403).json({
			data: {
				tokenVerificationData: { access: false, message: 'No token provided' }
			}
		});
		return;
	}
	const token = header.split(' ')[1];
	jwt.verify(token, ACCESS_TOKEN_SECRET, (err, decodedFromToken) => {
		if (err) {
			res.status(403).json({
				data: {
					tokenVerificationData: {
						access: false,
						message: 'Failed to verify token'
					}
				}
			});
			return;
		} else {
			req.value = { body: { decodeToken: decodedFromToken, token } };
			next();
		}
	});


}
const createToken = (data) => {
	return jwt.sign(
		{
			iss: 'Nguyen Phan Nhat Tu',
			data: data,
			iat: new Date().getTime(),
			exp: new Date().setDate(new Date().getDate() + 1)
		},
		ACCESS_TOKEN_SECRET
	);
}

module.exports = {
	verify, createToken
}