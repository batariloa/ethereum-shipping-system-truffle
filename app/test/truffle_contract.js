const TruffleContract = artifacts.require("../contracts/TruffleContract.sol");

/*
 * uncomment accounts to access the test accounts made available by the
 * Ethereum client
 * See docs: https://www.trufflesuite.com/docs/truffle/testing/writing-tests-in-javascript
 */
contract("TruffleContract", function (/* accounts */) {
  it("should assert true", async function () {
    await TruffleContract.deployed();
    return assert.isTrue(true);
  });
});
