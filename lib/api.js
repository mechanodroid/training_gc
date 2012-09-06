var airborne = require('./airborne').getClient(),
  _ = require('underscore');

var api = {
  channels: require("./channels")
};

// Stuff we need to do
api.channels.addChatChannel("lobby");
var statsChannel = api.channels.addStatsChannel("games");

api.channels.statsChannel = statsChannel;
//clone the airborne api
var api = _.extend({}, airborne);

module.exports = api;