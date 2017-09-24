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
          return res.status(401).send({ msg: 'There was a problem creating this project.'});
        }
        else {
            res.redirect('/');
        }
      });
};

// Math.floor(Math.random() * tags.length)
const tags = ['css', 'html', 'javascript', 'python', 'ruby', 'java', 'data science', 'angular.js', 'react', 'google maps api', 'C#', 'C++', 'angular 4', 'go', 'haskell'];

function shuffle(a) {
    var ctr = a.length, temp, index;


    while (ctr > 0) {

        index = Math.floor(Math.random() * ctr);

        ctr--;

        temp = a[ctr];
        a[ctr] = a[index];
        a[index] = temp;
    }
    return a;
}

exports.projectList = function(req, res, next) {
    Project.fetchAll().then(function(projects) {
        var randomTags = [];
        var shuffledArray = shuffle(tags);
        for (var i = 0; i < 2; i++) {
            randomTags.push(shuffledArray[i]);
        }

        projects.tags = randomTags;
        res.send(JSON.stringify({projects: projects}));
    });
};