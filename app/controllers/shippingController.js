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

const {encrypt, decrypt} = require('../util/encryptData')

const getAllShippings = async (req, res) => {
    
    initWeb3()

    res.send('yep')
}

const createShipping = async (req, res) => {

    const { toAddress, description} = req.body
    const userId = req.user.id
    
    if (!toAddress || !description ) {
        throw new AllErrors.BadRequestError('User ID, Shipping address or description not provided.')
    }

    const userExists = await User.find({ _id: userId });

    if (!userExists) {
        throw new AllErrors.BadRequestError('No such user')
    }
    
    const toAddressEncrypted = encrypt(toAddress)
    const descriptionEncrypted = encrypt(description)
    console.log('Encrypted data', toAddressEncrypted)

    const package = await Package.create({toAddress:toAddressEncrypted, description:descriptionEncrypted, user: req.user.id})
    const shipping = await addShipping(package, req.user.id)


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
            toAddress:decrypt(ship[2][i]),
            description: decrypt(ship[3][i]),
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

    const { packageId, received } = req.body
    const userId = req.user.id
    if (!packageId || !received || !userId) {
        throw new AllErrors.BadRequestError('Package ID or received value not provided.')

    }
    
    const result = await setReceived(packageId, userId, received)


    res.json(`Set received: `, received)
}

const getOnePackageController = async (req, res) => {
    
    const { packageId } = req.params

    const userId = req.user.id
    console.log('user id ',userId )

    if (!userId || !packageId) {
        throw new AllErrors.BadRequestError('Please provide all required fields')
    }

    const package = await getOnePackage(userId, packageId)

    const addressValue = package[2]

    const address = decrypt(addressValue);
    const descriptionDecrypted = decrypt(package[3])

    console.log('Package id in controller: ', packageId)
    const returnObject = {
        id: ethers.utils.parseBytes32String(package[0]),
        user: ethers.utils.parseBytes32String(package[1]),
        toAddress: address,
        description: descriptionDecrypted,
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