/*jshint node:true*/
'use strict';

var Match = require('../models/match');

module.exports = function(app) {

    //POST a match
    app.post('/api/match', function(req, res) {
        var match = new Match({ profileIDs: [req.body.profileA, req.body.profileB] });
        match.save(function(err, data) {
            if (err) return res.status(500).send('there was an error');
            res.json(data);
        });
        //needs to update both profile.match[] with this match _id !!
    });

    //GET a match
    app.get('/api/match/:id', function(req, res) {
        Match.findOne({_id: req.params.id}, function(err, data) {
            if (err) return res.status(500).send('there was an error');
            res.json(data);
        });
    });

};
