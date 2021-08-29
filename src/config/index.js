require('dotenv').config();
const configEnv = {
	ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET,
	JWT_KEY: process.env.JWT_KEY,
	MONGO_URI: process.env.MONGO_URI,
	PORT: process.env.PORT,
	BUCKET: process.env.BUCKET,
	REGION: process.env.REGION,
	AWS_ACCESS_KEY: process.env.AWS_ACCESS_KEY,
	AWS_SECRET_KEY: process.env.AWS_SECRET_KEY
};
const DFAcademicLevelValue = [
	'Tiểu Học',
	'Trung học cơ sở',
	'Trung học phổ thông',
	'Trung cấp',
	'Trung cấp nghề',
	'Cao đẳng',
	'Đại học',
	'Thạc sĩ',
	'Tiến sĩ'
];

const DFAcademicLevel = {
	primarySchool: 0,
	juniorHighSchool: 1,
	highSchool: 2,
	intermediate: 3,
	vocational: 4,
	college: 5,
	university: 6,
	master: 7,
	doctor: 8
};

const DFVerifyValue = ['Chưa xác thực', 'Đã xác thực', 'Khóa tài khoản'];

const DFVerify = {
	unconfirmed: 0,
	confirmed: 1,
	lockAccount: 2
};

const DFGenderValue = ['Nữ', 'Nam', 'Khác'];
const DFGender = {
	female: 0,
	male: 1,
	other: 2
};

const DFStatusLoanValue = ['InActive', 'Active'];

const DFStatusLoan = {
	inActive: 0,
	active: 1,
	deleted:2
};

const DFStatusTypeLoanValue = ['InActive', 'Active', 'Deleted'];

const DFStatusTypeLoan = {
	inActive: 0,
	active: 1,
	deleted: 2
};


const DFRole = {
	user: 0,
	admin: 1
}
const DFRoleValue = ["User", "Admin"]
module.exports = {
	configEnv,
	DFAcademicLevelValue,
	DFAcademicLevel,
	DFVerifyValue,
	DFStatusTypeLoan,
	DFStatusTypeLoanValue,
	DFStatusLoan,
	DFStatusLoanValue,
	DFGender,
	DFGenderValue,
	DFVerify,
	DFRole,
	DFRoleValue
};