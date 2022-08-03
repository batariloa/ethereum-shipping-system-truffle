const express = require('express')
const router = express.Router()

const { getAllShippings } = require('../controllers/shippingController')

const checkPermission = require('../util/checkPermissions')

router.route('/').get(checkPermission, getAllShippings)


module.exports = router