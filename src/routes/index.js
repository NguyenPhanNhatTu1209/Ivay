const express = require('express')
const authRoute = require('./authRoute')
const guestRoute = require('./guestRoute')
const chatRoute=require('./chatRoute')
// const billRoute = require('./billRoute')
const orderRoute = require('./orderRoute')
const addressRoute = require('./addressRoute')
const packageRoute = require('./packageRoute')



const router = express.Router()

router.use('/auth', authRoute)
router.use('/guest', guestRoute)
router.use('/chat', chatRoute)
router.use('/order', orderRoute)
router.use('/address', addressRoute)
router.use('/package', packageRoute)



router.get('/healCheckw', (req, res) => res.status(200).send('Welcome to PTSHIP v1'))

module.exports = router