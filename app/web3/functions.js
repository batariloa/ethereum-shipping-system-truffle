
var express = require("express");
const { type } = require("os");
var app = express();
const path = require("path");
const { ethers } = require("ethers");

var Web3 = require('web3');
var rpcProvider = 'http://0.0.0.0:7545';
const provider = new ethers.providers.JsonRpcProvider(rpcProvider)

const privateKey = '9d7b8cc40a41a13a3d9159de8aa3f8bc93cffc8fa5ac88ca839327b107678152'

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


await packageContractInstance.addPackageFree(senderId,22, desc).then((result) =>{
    console.log('result is', result)
})

await packageContractInstance.callStatic.getOne().then((result) =>{
    console.log('result is', parseInt(result))
})
}



module.exports = {
    initWeb3
}
