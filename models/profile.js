/*jshint node:true*/
'use strict';

var mongoose = require('mongoose');

var profileSchema = mongoose.Schema({
    name: { type: String, required: true },
    age: { type: Number, min: 18, max: 99, required: true },
    sex: { type: String, required: true },
    location: { type: String, required: true },
    interest: {
        ageMin: { type: Number, min: 18, max: 99 },
        ageMax: { type: Number, min: 19, max: 99 },
        sex: { type: String }
    },
    matches: [],
    dateJoined: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Profile', profileSchema);
