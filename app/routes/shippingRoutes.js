const express = require('express')
const router = express.Router()

const {
    getAllShippings,
    createShipping,
    getMyPackagesController,
    setReceivedController,
    getOnePackageController
} = require('../controllers/shippingController')

const { authenticateUser, authorizePermissions } = require('../middleware/authenticationMiddleware')

router.route('/').get(authenticateUser, getAllShippings)
router.route('/').post(authenticateUser, authorizePermissions('admin'),createShipping)
router.route('/myPackages').get(authenticateUser, getMyPackagesController)
router.route('/setReceived').post(authenticateUser, setReceivedController)
router.route('/:packageId').get(authenticateUser, getOnePackageController)


module.exports = router

