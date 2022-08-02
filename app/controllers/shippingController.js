const Web3 = require('web3')
const {initWeb3} = require("../web3/functions")


const getAllShippings = async (req, res) => {
    
    initWeb3()

    res.send('yep')
}



const createShipping = async (req, res) => {
    
    res.send('Shipping created')
}

module.exports = {
    getAllShippings,
    createShipping
}