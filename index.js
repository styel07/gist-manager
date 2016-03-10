'use strict';
const PORT = process.env.PORT || 3000;
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var OAuth2 = require('oauth').OAuth2;
const oauth2 = module.exports = new OAuth2(
  '05fa829b5202ee8f7f07',                       // client id
  'c9e413fd0c4ae23ae4b3a9c2ba976597457c3535',   // user secret key
  'https://github.com/',              // provider
  'login/oauth/authorize',            // provider login paths
  'login/oauth/access_token',         // provider access token path
  null                                // options
);
var auth = require('./routes/auth');
var gists = require('./routes/gists');

// app.set('view engine', 'html');
app.use(bodyParser.urlencoded({ extended : true }));  // gives the ability body parser
app.use(bodyParser.json());                           // gives the ability body parser
app.use(methodOverride((req,res) => {
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    var method = req.body._method;

    delete req.body._method;

    return method;
  }
}));
console.log(__dirname);
app.use(express.static(__dirname + '/public'));
app.use('/auth', auth);
app.use('/gists', gists);

// app.get('/', (req, res) => {
//   res.render('inde');
// });

app.get('/*', function(req, res) {
  res.sendFile(__dirname   + '/public/index.html');
});

app.listen(PORT, () => {
  console.log('listening on port' + PORT);
});