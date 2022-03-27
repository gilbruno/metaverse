//const {artifacts} = require("truffle");
//const {web3} = require("web3");


const Land = artifacts.require("Land");

module.exports = function (deployer) {

    const NAME   = "Metaverse Buildings"    
    const SYMBOL = "DUB"
    const COST   = web3.utils.toWei('1', 'ether')  
    deployer.deploy(Land, NAME, SYMBOL, COST);
};
