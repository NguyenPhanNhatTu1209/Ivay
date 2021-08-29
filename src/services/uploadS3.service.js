const { configEnv } = require('../config');
const aws = require("aws-sdk");
const { optional } = require('@hapi/joi');
const { ConnectionStates } = require('mongoose');

exports.uploadImageS3 = async (body,expries = 300) => {
	try {
		var s3 = new aws.S3({
			accessKeyId: configEnv.AWS_ACCESS_KEY,
			secretAccessKey: configEnv.AWS_SECRET_KEY,
			region: configEnv.REGION,
			// endpoint: 'lambiengcode.tk', 
		});
		const s3Params = {
			Bucket: configEnv.BUCKET,
			Key: body.name,
			Expires: expries,
			ContentType: body.type
		};
		const signedUrl = await s3.getSignedUrl('putObject', s3Params);
		return signedUrl;
	} catch (e) {
		console.log(e);
		return null;
	}
};

exports.getImageS3 = async (body,expries = 300) => {
	try {
		var s3 = new aws.S3({
			accessKeyId: configEnv.AWS_ACCESS_KEY,
			secretAccessKey: configEnv.AWS_SECRET_KEY,
			region: configEnv.REGION,
			// endpoint: 'lambiengcode.tk', 
		});
		const s3Params = {
			Bucket: configEnv.BUCKET,
			Key: body,
			Expires: expries,
		};
		const signedUrl = await s3.getSignedUrl('getObject', s3Params);
		return signedUrl;
	} catch (e) {
		console.log(e);
		return null;
	}
};
