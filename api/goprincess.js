'use strict';

const urlProvider = 'http://127.0.0.1:8565';
const gasTransfer = 21000;
var gasTransferPrice = '40'; //changed to wei below

var express = require('express');
var router = express.Router();

const Web3 = require('web3');
var web3;
if (typeof web3 !== 'undefined') {
    web3 = new Web3(web3.currentProvider);
} else {
    web3 = new Web3(new Web3.providers.HttpProvider(urlProvider));
}
gasTransferPrice = web3.utils.toWei(gasTransferPrice, 'gwei');

router.post('/', function(req, res) {
  res.json({ message: 'test' }); 
});

router.post('/new_account', function(req, res) {
  web3.eth.personal.newAccount(req.body.pwd)
    .then((addr) => {
      res.json({ result: addr });
    });
});

router.post('/get_balance', function(req, res) {
  web3.eth.getBalance(req.body.address)
    .then((balance) => {
      res.json({ result: web3.utils.fromWei(balance) });
    });
});

router.post('/transfer', function(req, res) {
  web3.eth.getBalance(req.body.from)
    .then((balance) => {
      if (balance < req.body.value) {
        res.json({ result: "please deposit into your account before transfering" });
      } else {
        web3.eth.personal.unlockAccount(req.body.from, req.body.pwd, 2000)
          .then(() => {
            web3.eth.sendTransaction({
              from: req.body.from,
              to: req.body.to,
              value: web3.utils.toWei(req.body.value),
              gas: gasTransfer,
              gasPrice: gasTransferPrice
            }, (err, txhash) => {
              if (!err) {
                res.json({error: err, result: txhash});
              } else {
                res.json({error: err, result: txhash}); 
              }
            });

          }).catch((error) => {
            res.json(error);
          });
	

    
    
        }
  
  
  
    });

});

router.post('/get_txinfo', function(req, res) {
  var receipt = web3.eth.getTransaction(req.body.txhash).then((obj) => {
    res.json({result: obj});
  });
});

module.exports = router;