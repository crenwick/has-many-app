/*jshint node:true*/
'use strict';

var Profile = require('../models/profile');

module.exports = function(app) {

    //POST a profile
    app.post('/api/profile', function(req, res) {
        var profile = new Profile(req.body);
        profile.save(function(err, data) {
            if (err) return res.status(500).send('there was an error');
            res.json(data);
        });
    });

    //GET a profile
    app.get('/api/profile/:id', function(req, res) {
        Profile.findOne({_id: req.params.id}, function(err, data) {
            if (err) return res.status(500).send('there was an error');
            res.json(data);
        });
    });

    //GET a index of a city
    app.get('/api/loc/:city', function(req, res) {
        Profile.find({ location: req.params.city }, function(err, data) {
            if (err) return res.status(500).send('there was an error');
            res.json(data);
        });
    });

    //PUT a profile update
    app.put('/api/profile/:id', function(req, res) {
        var profile = req.body;
        delete profile._id;
        Profile.findOneAndUpdate({_id: req.params.id}, profile, function(err, data) {
            if (err) return res.status(500).send('there was an error');
            res.json(data);
        });
    });

    //DELETE a profile
    app.delete('/api/profile/:id', function(req, res) {
        Profile.remove({_id: req.params.id}, function(err) {
            if (err) return res.status(500).send('there was an error');
            res.json({msg: 'success!'});
        });
    });

    //POST a match
    //GET a match
};
