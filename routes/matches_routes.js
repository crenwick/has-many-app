/*jshint node:true*/
'use strict';

var Match = require('../models/match');
var Profile = require('../models/profile');

module.exports = function(app) {

    //POST a match
    app.post('/api/match', function(req, res) {
        var match = new Match({ profileIDs: [req.body.profileA, req.body.profileB] });
        match.save(function(err, data) {
            if (err) return res.status(500).send('there was an error');

            Profile.findOneAndUpdate(
                {_id: req.body.profileA}, {$push: {matches: data._id}},
                {safe: true, upsert: true},
                function(err) {
                    if (err) console.log(err);
                });

            Profile.findOneAndUpdate(
                {_id: req.body.profileB}, {$push: {matches: data._id}},
                {safe: true, upsert: true},
                function(err) {
                    if (err) console.log(err);
                });
            res.json(data);
        });
    });

    //GET a match
    app.get('/api/match/:id', function(req, res) {
        Match.findOne({_id: req.params.id}, function(err, data) {
            if (err) return res.status(500).send('there was an error');
            res.json(data);
        });
    });

    //DELETE a match
    app.delete('/api/match/:id', function(req, res) {
        Match.remove({_id: req.params.id}, function(err) {
            if (err) return res.status(500).send('there was an error');
            res.json({msg: 'success!'});
        });
    });

};
