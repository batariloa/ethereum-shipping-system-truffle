const express = require('express')
const router = express.Router()

const { getAllShippings, createShipping } = require('../controllers/shippingController')

const checkPermission = require('../util/checkPermissions')
const { authenticateUser } = require('../middleware/authenticationMiddleware')

router.route('/').get(authenticateUser, getAllShippings)
router.route('/').post(authenticateUser, createShipping)


module.exports = router