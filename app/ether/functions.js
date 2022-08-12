
var express = require("express");
var app = express();
const path = require("path");
const { ethers } = require("ethers");

const Package = require('../model/Package')

var Web3 = require('web3');
const { BadRequestError } = require("../error");
var rpcProvider = 'http://0.0.0.0:7545';
const provider = new ethers.providers.JsonRpcProvider(rpcProvider)

const privateKey = 'c9f1ea2e33b739f7c0c472ed646ac22a99c10916b2725afb3fe732019ca01a13'

var web3Provider = new Web3.providers.HttpProvider(rpcProvider);
var web3 = new Web3(web3Provider);

const signer = new ethers.Wallet(privateKey,provider)



const initWeb3= async ()=>{

const  PackageContract   = require('../build/contracts/PackagesAll.json')
const networkId = await web3.eth.net.getId();
console.log(' do ovde?')
const packageContractInstance = new ethers.Contract( PackageContract.networks[networkId].address,PackageContract.abi, signer);


console.log('stigao do ovde')
var str = ethers.utils.formatBytes32String("soemuser")
var senderId =ethers.utils.formatBytes32String("22")
var desc = ethers.utils.formatBytes32String("some desc")
const addressEnc  = ethers.utils.formatBytes32String("some address")



await packageContractInstance.addPackageFree(senderId,str,addressEnc, desc).then((result) =>{
    console.log('result is', result)
})

await packageContractInstance.callStatic.getOne().then((result) =>{
    console.log('result is', parseInt(result))
})
}

const addShipping = async (package, userId)=>{



    const  PackageContract   = require('../build/contracts/PackagesAll.json')
    const networkId = await web3.eth.net.getId();
    console.log(' do ovde?')
    const packageContractInstance = new ethers.Contract( PackageContract.networks[networkId].address,PackageContract.abi, signer);
    
    
    console.log('stigao do ovde', package)

    if (!package._id || !package.user || !package.toAddress || !package.description) {
        throw new BadRequestError('Missing required fields')
    }

    console.log(' packaaage is ', package)
    var packageId = ethers.utils.formatBytes32String(package._id.toString())

    console.log('package is ', packageId)
    var senderId = ethers.utils.formatBytes32String(userId)
    console.log("pravim paket za user id ", senderId)

    var address = ethers.utils.formatBytes32String(package.toAddress)
    var description = ethers.utils.formatBytes32String(package.description)

 
    
    console.log('stigao do 67')
    
    await packageContractInstance
        .addPackageFree(
             packageId,
             senderId,
             address,
             description
        )
        .then((result) => {

        console.log('result is', result)
    })
 console.log('stigao do kraja')
}
    

const getMyPackages = async (userId)=>{



    const  PackageContract   = require('../build/contracts/PackagesAll.json')
    const networkId = await web3.eth.net.getId();
    console.log(' do ovde?')
    const packageContractInstance = new ethers.Contract( PackageContract.networks[networkId].address,PackageContract.abi, signer);
   
    var sender = ethers.utils.formatBytes32String(userId)
 
    
    console.log('stigao do 67')
    
    console.log('Getting packages for user ', sender)
    const packages =   packageContractInstance
        .getMyPackages(sender)
    
    console.log('stigao do kraja, ', packages)
    
    return packages
}
    

const setReceived = async (packageId, userId, value)=>{



    const  PackageContract   = require('../build/contracts/PackagesAll.json')
    const networkId = await web3.eth.net.getId();
    console.log(' do ovde?')
    const packageContractInstance = new ethers.Contract( PackageContract.networks[networkId].address,PackageContract.abi, signer);
    
    

    if (!packageId || !userId || !value) {
        throw new BadRequestError('Missing required fields')
    }

    var packageId = ethers.utils.formatBytes32String(packageId)
    var senderId = ethers.utils.formatBytes32String(userId)
    
 
    
    
    await packageContractInstance
        .setReceived(
            senderId,
            packageId,
            value
            
        )
  
}

module.exports = {
    initWeb3,
    addShipping,
    getMyPackages,
    setReceived
}
