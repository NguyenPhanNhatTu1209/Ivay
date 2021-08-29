const express = require('express')
const authRoute = require('./authRoute')
const useRoute = require('./userRoute')
const loanRoute=require('./loan.route')
const router = express.Router()

router.use('/auth', authRoute)
router.use('/user', useRoute)
router.use('/loan',loanRoute)



router.get('/healCheckw', (req, res) => res.status(200).send('Welcome to IVAY'))

module.exports = router