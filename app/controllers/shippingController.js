const {
    initWeb3,
    addShipping,
    getMyPackages,
    setReceived,
    getOnePackage
} = require("../ether/functions")

const { ethers, AbiCoder } = require("ethers");

const Package = require('../model/Package')
const AllErrors = require('../error/');
const { StatusCodes } = require("http-status-codes");
const User = require("../model/User");

const getAllShippings = async (req, res) => {
    
    initWeb3()

    res.send('yep')
}


const createShipping = async (req, res) => {
    

   
    const { toAddress, description, userId } = req.body
    
    if (!toAddress || !description || !userId) {
        throw new AllErrors.BadRequestError('User ID, Shipping address or description not provided.')
    }

    const userExists = await User.find({ _id: userId });

    if (!userExists) {
        throw new AllErrors.BadRequestError('No such user')
    }
    
    const package = await Package.create({ toAddress, description, user: userId })
    const shipping = await addShipping(package, userId)


    console.log('Made this package, ', package)
    res.send(`Shipping created ${package}`)
}

const getMyPackagesController = async (req, res) => {
    const userId = req.user.id
    if (!userId) {
        console.log("user ", req.user)
        throw new AllErrors.BadRequestError('Not authenticated')
    }
   
    const ship = await getMyPackages(userId)
    console.log('CODED SHIP IS', ship)



    const packageObjects = []
    
    for (var i = 0; i < ship[0].length; i++){
        
        const packageObjectSingle = {
            id: ethers.utils.parseBytes32String(ship[0][i]),
            user: ethers.utils.parseBytes32String(ship[1][i]),
            toAddress: ethers.utils.parseBytes32String(ship[2][i]),
            description: ethers.utils.parseBytes32String(ship[3][i]),
            owner: ship[4][i],
            isReceived: ship[5][i],
            shipmentDate:ethers.utils.parseBytes32String(ship[6][i])
         
        }

        packageObjects.push(packageObjectSingle)
    }

    console.log('Got these packages, ', packageObjects)

    res.status(StatusCodes.OK).json({ packageObjects })
}


const setReceivedController = async (req, res) => {

    const { packageId, received, userId } = req.body
    
    if (!packageId || !received || !userId) {
        throw new AllErrors.BadRequestError('Package ID or received value not provided.')

    }
    
    const result = await setReceived(packageId, userId, received)


    console.log('Set result: , ', result)
    res.json(`Set result ${result}`)
}

const getOnePackageController = async (req, res) => {
    
    const { packageId, userId } = req.params
 


    if (!userId || !packageId) {
        throw new AllErrors.BadRequestError('Please provide all required fields')
    }

    const package = await getOnePackage(userId, packageId)

    console.log('Package id in controller: ', packageId)
    const returnObject = {
        id: ethers.utils.parseBytes32String(package[0]),
        user: ethers.utils.parseBytes32String(package[1]),
        toAddress: ethers.utils.parseBytes32String(package[2]),
        description: ethers.utils.parseBytes32String(package[3]),
        owner: package[4],
        isReceived: package[5],
        shipmentDate: package[6]
    }
    console.log('Returned value, ', package)

    res.status(200).json(returnObject)
}

module.exports = {
    getAllShippings,
    createShipping,
    getMyPackagesController,
    setReceivedController,
    getOnePackageController
}