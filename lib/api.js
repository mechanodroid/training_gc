var airborne = require('./airborne').getClient(),
  _ = require('underscore');

var api = _.extend({}, airborne);
api.channels = require("./channels");
api.data = require("./data/data");
  //activeGamesChannel: require("./activeGamesChannel")

// Stuff we need to do
api.channels.addChatChannel("lobby");
var statsChannel = api.channels.addStatsChannel("games");

api.channels.statsChannel = statsChannel;
//clone the airborne api

//api.activeGamesChannel.createChannel();
//api.activeGamesChannel.setGamesRegistry(api.data.activeGames);

module.exports = api;