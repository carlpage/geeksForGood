var async = require('async');
var jwt = require('jsonwebtoken');
var moment = require('moment');
var request = require('request');
var qs = require('querystring');
var Dataset = require('../models/Dataset');
var DatasetComment = require('../models/DatasetComment');

export.datasetCommentPost = function(req, res, next) {
    req.assert('comment', 'Comment cannot be blank').notEmpty();
    req.assert('score', 'Score cannot be blank').notEmpty();


    var errors = req.validationErrors();
    
    if (errors) {
          return res.status(400).send(errors);
    }

    new DatasetComment({userId: req.user.id, comment: req.body.comment, score: req.body.score, datasetId: req.params.datasetId })
    .save()
    .then(function(datasetcomment) {
        if (!datasetcomment) {
            return res.status(401).send({ msg: 'There was a problem creating this project comment.'});
        }
        else {
            res.redirect('/'+req.params.datasetId);
        }
    });
};

export.commentList = function(req, res, next) {
    DatasetComment.where({datasetId: req.params.datasetId}).fetchAll().then(function(datasetcomments) {
        res.send(JSON.stringify({datasetcomments: datasetcomments}));
    });
};