const jayson = require('jayson');
const client = jayson.client.http('http://127.0.0.1:8565');
const BigNumber = require('bignumber.js');

// client.request('ping', [], null, function(err) {
//   if(err) throw err;
//   console.log('ok'); // request was received successfully
// });

// client.request('web3_clientVersion', [], function(err, response) {
//   if(err) throw err;
//   console.log(response);
//   console.log(response.result);
// });

// client.request(batch, function(err, errors, successes) {
//   if(err) throw err;
//   console.log('errors', errors); // array of requests that errored
//   console.log('successes', successes); // array of requests that succeeded
// });

var protocolVersion;
client.request('eth_protocolVersion', [], function(err, response) {
    if(err) throw err;
    protocolVersion = response.result;

    console.log(protocolVersion);
    
    client.request('eth_accounts', [], function(err, response) {
    if(err) throw err;
    //console.log(response);
    console.log(response.result);
    });

});


// client.request(batch, function(err, errors, successes) {
//   if(err) throw err;
//   console.log('errors', errors); // array of requests that errored
//   console.log('successes', successes); // array of requests that succeeded
// });

