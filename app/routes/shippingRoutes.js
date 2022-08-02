const express = require('express')
const router = express.Router()

const { getAllShippings } = require('../controllers/shippingController')

router.route('/').get(getAllShippings)


module.exports = router