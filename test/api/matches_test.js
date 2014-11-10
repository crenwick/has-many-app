/*jshint node:true*/
'use strict';

process.env.MONGO_URL = 'mongodb://localhost/has_many_development';
var chai = require('chai');
var chaihttp = require('chai-http');
chai.use(chaihttp);

require('../../server');

var expect = chai.expect;

describe('basic profile crud', function() {
    var idTestProfile;
    var testProfile = {name: 'Charles',
                       age: 23,
                       sex: 'M',
                       location: 'Seattle',
                       interest: {ageMin: 20,
                                  ageMax: 30,
                                  sex: 'F'}
                      };
    var idTestProfile2;
    var testProfile2 = {name: 'HipsterGurl',
                        age: 21,
                        sex: 'F',
                        location: 'Seattle',
                        interest: {ageMin: 20,
                                   ageMax: 30,
                                   sex: 'M'}
                       };
    var matchID;

    it('should be able to create A profile', function(done) {
        chai.request('http://localhost:3000')
        .post('/api/profile')
        .send(testProfile)
        .end(function(err, res) {
            expect(err).to.eql(null);
            expect(res.body.name).to.eql('Charles');
            expect(res.body).to.have.property('_id');
            idTestProfile = res.body._id;
            done();
        });
    });

    it('should create profile B', function(done) {
        chai.request('http://localhost:3000')
        .post('/api/profile')
        .send(testProfile2)
        .end(function(err, res) {
            expect(err).to.eql(null);
            expect(res.body.name).to.eql('HipsterGurl');
            expect(res.body).to.have.property('_id');
            idTestProfile2 = res.body._id;
            done();
        });
    });

    it('should be able to get a single profile', function(done) {
        chai.request('http://localhost:3000')
        .get('/api/profile/' + idTestProfile)
        .end(function(err, res) {
            expect(err).to.eql(null);
            expect(res.body.sex).to.eql('M');
            done();
        });
    });

    it('should be able to get an index of Seattle', function(done) {
        chai.request('http://localhost:3000')
        .get('/api/loc/Seattle')
        .end(function(err, res) {
            expect(err).to.eql(null);
            expect(Array.isArray(res.body)).to.be.true;
            done();
        });
    });

    it('should be able to update a profile', function(done) {
        testProfile.age = 25;
        chai.request('http://localhost:3000')
        .put('/api/profile/' + idTestProfile)
        .send(testProfile)
        .end(function(err, res) {
            expect(err).to.eql(null);
            expect(res.body.age).to.eql(25);
            done();
        });
    });

    it('should match two profiles', function(done) {
        chai.request('http://localhost:3000')
        .post('/api/match')
        .send({profileA: idTestProfile,
               profileB: idTestProfile2})
        .end(function(err, res) {
            expect(err).to.eql(null);
            expect(Array.isArray(res.body.profileIDs)).to.be.true;
            expect(res.body.profileIDs[0]).to.eql(idTestProfile);
            expect(res.body.profileIDs[1]).to.eql(idTestProfile2);
            expect(res.body).to.have.property('_id');
            matchID = res.body._id;
            done();
        });
    });

    it('should be able to get a single match', function(done) {
        chai.request('http://localhost:3000')
        .get('/api/match/' + matchID)
        .end(function(err, res) {
            expect(err).to.eql(null);
            expect(Array.isArray(res.body.profileIDs)).to.be.true;
            expect(res.body.profileIDs[0]).to.eql(idTestProfile);
            expect(res.body.profileIDs[1]).to.eql(idTestProfile2);
            done();
        });
    });

    it('should destroy A profile', function(done) {
        chai.request('http://localhost:3000')
        .delete('/api/profile/' + idTestProfile)
        .end(function(err, res) {
            expect(err).to.eql(null);
            expect(res.body.msg).to.eql('success!');
            done();
        });
    });

    it('should destroy B profile', function(done) {
        chai.request('http://localhost:3000')
        .delete('/api/profile/' + idTestProfile2)
        .end(function(err, res) {
            expect(err).to.eql(null);
            expect(res.body.msg).to.eql('success!');
            done();
        });
    });
});
