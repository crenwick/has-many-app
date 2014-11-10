/*jshint node:true*/
'use strict';

var mongoose = require('mongoose');

var matchSchema = mongoose.Schema({
    profileIDs: [],
//    votesY: { type: Number, default: 0 },
//    votesN: { type: Number, default: 0 },
    dateMatched: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Match', matchSchema);
