const express = require('express');
const path = require('path');
var app = express();
var favicon = require('serve-favicon');
var bodyParser = require('body-parser');

app.set('port', (process.env.PORT || 8080));
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.use(express.static(__dirname + '/public'));
app.use(favicon(__dirname + '/public/icons/favicon.ico'));
app.use(bodyParser.json());

app.use('/api', require('./api/goprincess'));

app.get('/', function(request, response) {
  response.render('pages/index');
});

app.listen(app.get('port'), function() {
  console.log('Listening on port', app.get('port'));
});

// express()
//   .use(express.static(path.join(__dirname, 'public')))
//   .set('views', path.join(__dirname, 'views'))
//   .set('view engine', 'ejs')
//   .get('/', (req, res) => res.render('pages/index'))
//   .listen(PORT, () => console.log(`Listening on ${ PORT }`))