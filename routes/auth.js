'use strict';
var express = require('express');
var router = express.Router();
var request = require('request');
var oauth2 = require('./../index.js');

// STEP 1: get the providers Auth URL
router.get('/login', (req,res) => {
  var authURL = oauth2.getAuthorizeUrl({
    redirect_uri : 'http://localhost:3000/auth/github/callback',
    scope : [ 'gist' ],
    state : 'Authorize' + Math.round(Math.random() * 999999)
  });
  res.json({ url : authURL });
});

// STEP 2: callback from the provider on successful authorization
router.get('/github/callback', (req,res) => {
  var code = req.query.code;
  if (code === undefined) {
    return res.status(401).json({ error : 401, message : 'Invalid auth code.' });
  }

  oauth2.getOAuthAccessToken(
    code,
    {
      redirect_uri : 'http://localhost:3000/auth/github/callback'
    },
    (err, access_token, refresh_token, results) => {
      if (err) {
        res.status(401).json(err);
      } else if ( results.error ) {
        res.status(401).json(results.error);
      } else { // everthing worked
        // get token
        // send token back to client
        res.json({ access_token : access_token });
      }
    });
});

module.exports = router;