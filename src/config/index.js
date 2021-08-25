require('dotenv').config()
exports.configEnv = {
  ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET,
  JWT_KEY: process.env.JWT_KEY,
  MONGO_URI: process.env.MONGO_URI,
  PORT: process.env.PORT,
}

exports.DFAcademicLevelValue = [
  "Tiểu Học",
  "Trung học cơ sở",
  "Trung học phổ thông",
  "Trung cấp",
  "Trung cấp nghề",
  "Cao đẳng",
  "Đại học",
  "Thạc sĩ",
  "Tiến sĩ"
]

exports.DFAcademicLevel = {
  primarySchool: 0,
  juniorHighSchool: 1,
  highSchool: 2,
  intermediate: 3,
  vocational: 4,
  college: 5,
  university: 6,
  master: 7,
  doctor:8
}


exports.DFVerifyValue = [
  "Chưa xác thực",
  "Đã xác thực",
  "Khóa tài khoản"
]

exports.DFVerify={
  unconfirmed:0,
  confirmed:1,
  lockAccount:2
}

exports.DFGenderValue = [
  "Nữ",
  "Nam",
  "Khác"
]
exports.DFGender = {
  female:0,
  male:1,
  other:2
}


exports.DFStatusLoanValue = [
  "InActive",
  "Active",
]


exports.DFStatusLoan = {
  inActive:0,
  active:1
}

exports.DFStatusTypeLoanValue = [
  "InActive",
  "Active",
  "Deleted"
]

exports.DFStatusTypeLoan = {
  inActive:0,
  active:1,
  deleted:2
}