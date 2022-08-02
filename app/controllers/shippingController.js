import Web3 from 'web3'

import configuration from '../build/contracts/Migrations.json'
const CONTRACT_ADRESS = configuration

const getAllShippings = async (req, res) => {
    
    res.send('Got all the shippings')
}

const createShipping = async (req, res) => {
    
    res.send('Shipping created')
}

module.exports = {
    getAllShippings,
    createShipping
}