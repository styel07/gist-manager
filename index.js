'use strict';
const PORT = process.env.PORT || 3000;
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var OAuth2 = require('oauth').OAuth2;
const oauth2 = module.exports = new OAuth2(
  process.env.GITHUB_CLIENT_ID,       // client id
  process.env.GITHUB_CLIENT_SECRET,   // user secret key
  'https://github.com/',              // provider
  'login/oauth/authorize',            // provider login paths
  'login/oauth/access_token',         // provider access token path
  null                                // options
);
var auth = require('./routes/auth');
var gists = require('./routes/gists');

app.use(bodyParser.urlencoded({ extended : true })); // gives the ability body parser

app.use(express.static('./public'));
app.use('/auth', auth);
app.use('/gists', gists);
app.get('/', (req, res) => {
  res.render('index');
});

app.listen(PORT, () => {
  console.log('listening on port' + PORT);
});