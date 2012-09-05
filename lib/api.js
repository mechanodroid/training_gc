var airborne = require('./airborne').getClient(),
  _ = require('underscore');

//clone the airborne api
var api = _.extend({}, airborne);

module.exports = api;