'use strict';
const BigNumber = require('bignumber.js');

function utils() {
    this.HexWeiToBalance = function(hexWei) {
        //TODO: parseInt got limit, check web3.js to see how they manage this bignumber/wei
        //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/MAX_SAFE_INTEGER
        return (parseInt(hexWei, 16) * Math.pow(10,(-18))).toString(10);
    };
    
    this.BalanceToHexWei = function(bal) {
        return 1;  
    };
}

module.exports = utils;