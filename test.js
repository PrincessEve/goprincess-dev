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
    
    // test('create account', (t) => {
    //     t.plan(2);
    //     var options = {
    //         url: 'http://127.0.0.1:8080/api/new_account',
    //         method: 'POST',
    //         json: {
    //             pwd:'12345'
    //         }
    //     }
    //     request(options, function(err, response, body) {
    //         t.false(err);
    //         t.equal(response.statusCode, 200);
    //         console.log('body:' , body);
    //         console.log('err:', err);
    //     });
    // });
    
    test('get balance', (t) => {
        t.plan(2);
        var options = {
            url: 'http://127.0.0.1:8080/api/get_balance',
            method: 'POST',
            json: {
                address:'0xe66bad68da780db435c022c5f8d98a3c9e3634b0'
            }
        }
        request(options, function(err, response, body) {
            t.false(err);
            //t.false(body.errorint);
            t.equal(response.statusCode, 200);

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
                from: '0xd9fc0b20e847fef123c4e6840984de1f60cf9b8f',
                pwd: "12345",
                to: '0xe66bad68da780db435c022c5f8d98a3c9e3634b0',
                value: '100'
            }
            // json: {
            //     from: '0xe66bad68da780db435c022c5f8d98a3c9e3634b0',
                            //pwd: "12345",
            //     to: '0xd9fc0b20e847fef123c4e6840984de1f60cf9b8f',
            //     value: '10'
            // }
        }
        request(options, function(err, response, body) {
            t.false(err);
            t.equal(response.statusCode, 200);

            console.log('body:' , body);
            console.log('err:', err);
        });
    });
    
    
    
});
//child.kill();
