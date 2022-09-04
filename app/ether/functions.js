
var express = require("express");
var app = express();
const path = require("path");
const { ethers } = require("ethers");

const Package = require('../model/Package')

var Web3 = require('web3');
const { BadRequestError } = require("../error");
var rpcProvider = 'http://0.0.0.0:7545';
const provider = new ethers.providers.JsonRpcProvider(rpcProvider)

const privateKey = process.env.WALLET

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

    const packageContractInstance = 
    new ethers.Contract(
        PackageContract.networks[networkId].address,
        PackageContract.abi, 
        signer);
    
    if (!package._id || !package.user || !package.toAddress || !package.description) {
        throw new BadRequestError('Missing required fields')
    }

    var packageId = ethers.utils.formatBytes32String(package._id.toString())
    var senderId = ethers.utils.formatBytes32String(userId)
    var address = package.toAddress
    var description = package.description
    var date = ethers.utils.formatBytes32String(package.shipmentDate.toString())
    
    await packageContractInstance
        .addPackageFree(
             packageId,
             senderId,
             address,
             description,
             date)
        .then((result) => {

        console.log('result is', result)
    })
}
    

const getMyPackages = async (userId)=>{

    const  PackageContract   = require('../build/contracts/PackagesAll.json')
    const networkId = await web3.eth.net.getId();
    console.log(' do ovde?')
    const packageContractInstance = new ethers.Contract( PackageContract.networks[networkId].address,PackageContract.abi, signer);
   
    var sender = ethers.utils.formatBytes32String(userId)
 
    const packages = packageContractInstance
        .getMyPackages(sender)
    
    
    return packages
}
    

const setReceived = async (packageId, userId, value)=>{

    const  PackageContract   = require('../build/contracts/PackagesAll.json')
    const networkId = await web3.eth.net.getId();

    const packageContractInstance = new ethers.Contract(PackageContract.networks[networkId].address, PackageContract.abi, signer);
    

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

const getOnePackage = async (userId, packageId)=>{

    const PackageContract   = require('../build/contracts/PackagesAll.json')
    const networkId = await web3.eth.net.getId();

    const packageContractInstance =
        new ethers.Contract(
        PackageContract.networks[networkId].address,
        PackageContract.abi, 
        signer
        );
   
    var userIdFormatted = ethers.utils.formatBytes32String(userId)
    var packageIdFormatted = ethers.utils.formatBytes32String(packageId)
    
    console.log('Getting packages for user ', userIdFormatted)
    const packages = await packageContractInstance
        .getOne(userIdFormatted, packageIdFormatted)
    
    console.log('WHAT PACKAGES HAVE BEEN RETURNED/??:', packages)
    return packages
    }
module.exports = {
    initWeb3,
    addShipping,
    getMyPackages,
    setReceived,
    getOnePackage
}
