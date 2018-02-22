const { spawn } = require('child_process');
const request = require('request');
const test = require('tape');

// Start the app
const env = Object.assign({}, process.env, {PORT: 8080});
const child = spawn('node', ['index.js'], {env});

// Wait until the server is ready
child.stdout.on('data', _ => { 
    test('check connection', (t) => {
        t.plan(2);
        var options = {
            url: 'http://127.0.0.1:8080/api',
            method: 'POST',
            json: {
                xx:''
            }
        }
        request.post(options, function(err, response, body) {
            t.false(err);
            t.equal(response.statusCode, 200);
            console.log('body:', body);
        });
    });
    
    test('create account', (t) => {
        t.plan(2);
        var options = {
            url: 'http://127.0.0.1:8080/api/new_account',
            method: 'POST',
            json: {
                pwd:'12345'
            }
        }
        request(options, function(err, response, body) {
            t.false(err);
            t.equal(response.statusCode, 200);
            console.log('body:' , body);
            console.log('err:', err);
        });
    });
    
    test('get balance', (t) => {
        t.plan(4);
        var options = {
            url: 'http://127.0.0.1:8080/api/get_balance',
            method: 'POST',
            json: {
                address:'0x3b9b4484f49e8dcd47e1f4e7ca6c17fe937afb03'
            }
        }
        var addr1 = options.json.address;
        request(options, function(err, response, body) {
            t.false(err);
            //t.false(body.errorint);
            t.equal(response.statusCode, 200);
            console.log('address:' , addr1);
            console.log('body:' , body);
            console.log('err:', err);
        });
        options = {
            url: 'http://127.0.0.1:8080/api/get_balance',
            method: 'POST',
            json: {
                address:'0xc592d169faf67399db59eada3e3b21b34dffab24'
            }
        }
        var addr2 = options.json.address;
        request(options, function(err, response, body) {
            t.false(err);
            //t.false(body.errorint);
            t.equal(response.statusCode, 200);
            console.log('address:' , addr2);
            console.log('body:' , body);
            console.log('err:', err);
        });
    });
    
    test('transfer balance', (t) => {
        t.plan(2);
        var options = {
            url: 'http://127.0.0.1:8080/api/transfer',
            method: 'POST',
            json: {
                from: '0x3b9b4484f49e8dcd47e1f4e7ca6c17fe937afb03',
                pwd: "",
                to: '0xc592d169faf67399db59eada3e3b21b34dffab24',
                value: '100'
            }
            // json: {
            //     from: '0xA4d1EB2E98B4fA139973278570c4076794242feB',
                            //pwd: "12345",
            //     to: '0xa7a0f8b943415b48e0dbf35ec55ef2fb26b41845',
            //     value: '100'
            // }
        }
        request(options, function(err, response, body) {
            t.false(err);
            t.equal(response.statusCode, 200);

            console.log('body:' , body);
            console.log('err:', err);
        });
    });
    
    
    test('get txinfo', (t) => {
        t.plan(2);
        var options = {
            url: 'http://127.0.0.1:8080/api/get_txinfo',
            method: 'POST',
            json: {
                txhash:'0x9809a8d1d1a7b501f2c3e712b92f29e1f6e68d8246fb535820f3866e1c553a93'
            }
        };
        request(options, function(err, response, body) {
            t.false(err);
            //t.false(body.errorint);
            t.equal(response.statusCode, 200);
            console.log('body:' , body);
            console.log('err:', err);
        });
    });
    
});
//child.kill();
