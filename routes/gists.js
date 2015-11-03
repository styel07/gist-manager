'use strict';
var express = require('express');
var router = express.Router();
var request = require('request');

router
  .route('/')
  .get(getAuthBearerToken, (req, res) => {
    request.get({
      url : 'https://api.github.com/gists',
      headers : {
        Authorization : 'Bearer ' + req.access_token,
        'User-Agent' : 'Node'
      },
    }, (err, response, body) => {
      if (err) {
        return res.status(500).json(err);
      }

      res.json(JSON.parse(body));
    });
  });
  // .post(getAuthBearerToken, (req, res) => {
  //   request
  // })

// router
//   .route('/:id')
//   .get()
//   .put()

function getAuthBearerToken (req, res, next) {
  if (!req.headers.hasOwnProperty('authorization')) {
    return res.status(401).json(
      { error : 401, message : 'Bearer auth token not found in headers'}
      );
  }
  let auth_header = req.headers.authorization;
  let auth_header_value = auth_header.split(' ');
  if (auth_header_value.length !== 2) {
    return res.status(401).json(
      { error : 401, message : 'Authorization header is malformed.'}
    );
  }

  req.access_token = auth_header_value[1];
  next();
}

module.exports = router;