const {
    initWeb3,
    addShipping
} = require("../ether/functions")

const Package = require('../model/Package')
const AllErrors = require('../error/')

const getAllShippings = async (req, res) => {
    
    initWeb3()

    res.send('yep')
}



const createShipping = async (req, res) => {
    const userId = req.user.id
    if (!userId) {
        console.log("user ", req.user)
        throw new AllErrors.BadRequestError('Not authenticated')
    }
    const { toAddress, description } = req.body
    
    if (!toAddress || !description) {
        throw new AllErrors.BadRequestError('Address or description not provided.')

    }
    
    const package = await Package.create({toAddress, description, user:userId})
    
    console.log('Made this package, ', package)
    res.send('Shipping created')
}

module.exports = {
    getAllShippings,
    createShipping
}