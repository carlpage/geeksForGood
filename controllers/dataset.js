var async = require('async');
var jwt = require('jsonwebtoken');
var moment = require('moment');
var request = require('request');
var qs = require('querystring');
var Dataset = require('../models/Dataset');
var User = require('../models/User');

exports.datasetPost = function(req, res, next) {
    req.assert('score', 'Score cannot be blank').notEmpty();
    req.assert('zipcode', 'Zipcode cannot be blank').notEmpty();
    req.assert('name', 'Name cannot be blank').notEmpty();
    req.assert('description', 'Description cannot be blank').notEmpty();
    req.assert('url', 'Url cannot be blank').notEmpty();

    var errors = req.validationErrors();

    if (errors) {
      return res.status(400).send(errors);
    }

    new Dataset({ uploadId: req.user.id, score: req.body.score, zipcode: req.body.zipcode, name: req.body.name, description: req.body.description, url: req.body.url })
      .save()
      .then(function(dataset) {
        if (!dataset) {
            return res.status(401).send({ msg: 'There was a problem creating this dataset.'
          });
        }
        else {
          res.redirect('/');
        }
      });
};

exports.datasetList = function(req, res, next) {
    Dataset.fetchAll().then(function(datasets) {
        res.send(JSON.stringify({datasets: datasets}));
    }); 
};