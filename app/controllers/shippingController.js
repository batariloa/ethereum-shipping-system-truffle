const {initWeb3} = require("../ether/functions")


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