'use strict';

var q = require('q');
var extend = require('extend');
var mongoose = require('mongoose');
require('../../backend/core/db/mongo/models/domain');
require('../../backend/core/db/mongo/models/community');
require('../../backend/core/db/mongo/models/user');
var Domain = mongoose.model('Domain');
var Community = mongoose.model('Community');
var User = mongoose.model('User');
var helpers = require('../../backend/core/db/mongo/plugins/helpers');
helpers.applyPlugins();
helpers.patchFindOneAndUpdate();

var userDomainModule = require('../../backend/core/user/domain');
var populateObjects = require('./data/populate-objects');

var ADMIN_OBJECT = populateObjects.ADMIN;

var USER_OBJECT = populateObjects.USER;

var DOMAIN_OBJECT = populateObjects.DOMAIN;

var COMMUNITY_OBJECT = populateObjects.COMMUNITY;

function _populateAdmin() {
  console.log('[INFO] POPULATE admin');
  var admin = new User(ADMIN_OBJECT);
  var deferred = q.defer();
  admin.save(deferred.makeNodeResolver());
  return deferred.promise;
}

function _populateDomain(admin) {
  console.log('[INFO] POPULATE domain');
  var object = extend({}, DOMAIN_OBJECT, { administrators: [{ user_id: admin[0] }] });
  var domain = new Domain(object);

  return q.ninvoke(domain, 'save')
    .then(function(domain) {
      return [admin[0], domain[0]];
    }, q.reject);
}

function _joinDomain(user, domain) {
  var deferred = q.defer();
  userDomainModule.joinDomain(user, domain, function(err) {
    if (err) { deferred.reject(err); }
    deferred.resolve([user, domain]);
  });
  return deferred.promise;
}

module.exports = function(host) {
  console.log('[INFO] POPULATE the ESN');
  return _populateAdmin()
    .then(_populateDomain)
    .spread(_joinDomain);
};
