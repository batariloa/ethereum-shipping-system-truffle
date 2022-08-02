var TruffleContract = artifacts.require('../contracts/TruffleContract.sol')

module.exports = function (deployer) {

deployer.deploy(TruffleContract)
};
