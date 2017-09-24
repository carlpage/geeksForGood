var async = require('async');
var jwt = require('jsonwebtoken');
var moment = require('moment');
var request = require('request');
var qs = require('querystring');
var Project = require('../models/Project');
var User = require('../models/User');

exports.projectPost = function(req, res, next) {
    req.assert('score', 'Score cannot be blank').notEmpty();
    req.assert('zipcode', 'Zipcode cannot be blank').notEmpty();
    req.assert('name', 'Name cannot be blank').notEmpty();
    req.assert('description', 'Description cannot be blank').notEmpty();

    var errors = req.validationErrors();

    if (errors) {
      return res.status(400).send(errors);
    }

    new Project({ creatorId: req.user.id, score: req.body.score, zipcode: req.body.zipcode, name: req.body.name, description: req.body.description })
      .save()
      .then(function(project) {
        if (!project) {
          return res.status(401).send({ msg: 'There was a problem creating this project.'
          });
        }
        
      });
};

exports.projectList = function(req, res, next) {
    Project.fetchAll().then(function(projects) {
        res.send(JSON.stringify({projects: projects}));
    }); 
};