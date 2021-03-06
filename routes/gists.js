'use strict';
var express = require('express');
var router = express.Router();
var request = require('request');

router
  .route('/')
  .all(getAuthBearerToken)
  .get((req, res) => {
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
  })

  // create a new gist from the contents of req.body, asks git to make a new git for you
  .post((req,res) => {
    request.post({
    // first aregument to POST
    url : 'https://api.github.com/gists',
    json : true,
    headers : {
      Authorization : 'Bearer ' + req.access_token,
      'User-Agent' : 'Node'
    },
    body : {
      description : req.body.description,
      public : true,
      files : req.body.files
    }
  },
    (err, response, body) => {
      if (err) {
        return res.status(500).json(err);
      }
      res.json(body);
    });
  });

// edit a gist
router
  .route('/:id')
  .all(getAuthBearerToken)

  .get((req, res) => {
    request.get({
      url : 'https://api.github.com/gists/' + req.params.id,
      headers : {
        Authorization : 'Bearer ' + req.access_token,
        'User-Agent' : 'Node'
      }
    }, (err, response, body) => {
      if (err) {
        return res.status(500).json(err);
      }
      res.json(JSON.parse(body));
    });
  })
  .patch((req,res) => {
    request.patch({
      url : 'https://api.github.com/gists/' + req.params.id,
      json : true,
      headers : {
        Authorization : 'Bearer ' + req.access_token,
        'User-Agent' : 'Node'
      },
      body : {
        description : req.body.description,
        public : true,
        files : req.body.files
      }
    }, (err, response, body) => {
      if (err) {
        return res.status(500).json(err);
      }
      res.json(body);
    });
  })
  .delete((req, res) => {
    request.del({
      url : 'https://api.github.com/gists/' + req.params.id,
      headers : {
        Authorization : 'Bearer ' + req.access_token,
        'User-Agent' : 'Node'
      }
    }, (err, response, body) => {
      if (err) {
        return res.status(500).json(err);
      }
    });
  });
function getAuthBearerToken (req, res, next) {
  if (!req.headers.hasOwnProperty('authorization')) {
    return res.status(401).json(
      { error : 401, message : 'Bearer auth token not found in headers' }
      );
  }
  let auth_header = req.headers.authorization;
  let auth_header_value = auth_header.split(' ');
  if (auth_header_value.length !== 2) {
    return res.status(401).json(
      { error : 401, message : 'Authorization header is malformed.' }
    );
  }

  req.access_token = auth_header_value[1];
  next();
}

module.exports = router;