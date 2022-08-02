const Migrations = artifacts.require("Migrations");
const PackagesAll = artifacts.require("../contracts/PackagesAll.sol")

module.exports = function(deployer) {
  deployer.deploy(Migrations);
  deployer.deploy(PackagesAll);

};
