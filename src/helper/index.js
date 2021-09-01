exports.convertObjectFieldString = (obj = {}) => {
  const entries = Object.entries(obj)
  return entries.reduce((t, v) => {
    t[v[0]] = `${v[1]}`
    return t
  }, {})
}
exports.calcPrice = (totalLoan, monthLoan, interestRate) => {
  const inter = interestRate / (12 * 100)
  const PV = totalLoan
  const tienLai = PV * inter

  const a = PV / monthLoan

  const monthlyPaymentAmount = Math.ceil((a + tienLai) / 1000) * 1000
  const totalDebit = monthlyPaymentAmount * monthLoan

  return {
    monthlyPaymentAmount,
    totalDebit
  }
}