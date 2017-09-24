var async = require('async');
var jwt = require('jsonwebtoken');
var moment = require('moment');
var request = require('request');
var qs = require('querystring');
var Project = require('../models/Project');
var ProjectComment = require('../models/ProjectComment');

exports.projectCommentPost = function(req, res, next) {
    
    req.assert('comment', 'Comment cannot be blank').notEmpty();
    req.assert('score', 'Score cannot be blank').notEmpty();
    
    var errors = req.validationErrors();
    
    if (errors) {
          return res.status(400).send(errors);
    }
    
    new ProjectComment({userId: req.user.id, comment: req.body.comment, score: req.body.score, projectId: req.params.projectId })
        .save()
        .then(function(projectcomment) {
            if (!projectcomment) {
                return res.status(401).send({ msg: 'There was a problem creating this project comment.'});
            }
            else {
                res.redirect('/'+req.params.projectId);
            }
        });
};

exports.commentList = function (req, res, next) {
    ProjectComment.where({projectId: req.params.projectId}).fetchAll().then(function(projectcomments) {
        res.send(JSON.stringify({projectcomments: projectcomments}));
    });
};