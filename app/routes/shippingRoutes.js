const express = require('express')
const router = express.Router()

const {
    getAllShippings,
    createShipping,
    getMyPackagesController,
    setReceivedController
} = require('../controllers/shippingController')

const checkPermission = require('../util/checkPermissions')
const { authenticateUser } = require('../middleware/authenticationMiddleware')

router.route('/').get(authenticateUser, getAllShippings)
router.route('/').post(authenticateUser, createShipping)
router.route('/myPackages').get(authenticateUser, getMyPackagesController)
router.route('/setReceived').post(authenticateUser, setReceivedController )


module.exports = router