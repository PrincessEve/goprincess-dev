const Web3 = require('web3');

var web3;
if (typeof web3 !== 'undefined') {
    web3 = new Web3(web3.currentProvider);
    console.log("take web3 from previous defined");
} else {
    web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:8565"));
    //web3 = new Web3('http://127.0.0.1:8565');
    console.log("define new web3 object");
}
console.log("web3.version:", web3.version);
console.log("web3.currentProvider:", web3.currentProvider);

// web3.eth.net.isListening()
//   .then(() => {
//       console.log('is connected');
//   })
//   .catch(e => console.log('Wow. Something went wrong'));
   

//web3.eth.getAccounts(console.log);

console.log(web3.eth.net);

// var foo;
// web3.eth.getAccounts().then(accts => {foo = accts});
// console.log(foo);

var coinbase = web3.eth.coinbase;
console.log(coinbase);

var balance = web3.eth.getBalance(coinbase);

console.log(web3.fromWei(balance.toNumber(), 'ether'));