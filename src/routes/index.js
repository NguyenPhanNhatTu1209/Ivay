const express = require('express')
const authRoute = require('./auth.Route')
const useRoute = require('./userRoute')
const loanRoute=require('./loan.route')
const chatRoute=require('./chatRoute')

const router = express.Router()

router.use('/auth', authRoute)
router.use('/user', useRoute)
router.use('/loan',loanRoute)
router.use('/chat',chatRoute)



router.get('/healCheckw', (req, res) => res.status(200).send('Welcome to IVAY'))

module.exports = router