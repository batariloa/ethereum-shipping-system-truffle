const {
    initWeb3,
    addShipping,
    getMyPackages
} = require("../ether/functions")
const { ethers, AbiCoder } = require("ethers");

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
    const shipping = await addShipping(package, userId)


    console.log('Made this package, ', package)
    res.send('Shipping created')
}

const getMyPackagesController = async (req, res) => {
    const userId = req.user.id
    if (!userId) {
        console.log("user ", req.user)
        throw new AllErrors.BadRequestError('Not authenticated')
    }
   
    const ship = await getMyPackages(userId)
    
    // returnBytesArray is of type Uint8Array where each 32 bytes encodes a single value

    console.log('Got these packages, ', ship)
    res.send(`Got these packages `)
}


module.exports = {
    getAllShippings,
    createShipping,
    getMyPackagesController
}