var airborne = require('./airborne').getClient(),
  _ = require('underscore');

var api = {
  channels: require("./channels"),
  data: require("./data/data"),
  //activeGamesChannel: require("./activeGamesChannel")
};

// Stuff we need to do
api.channels.addChatChannel("lobby");
var statsChannel = api.channels.addStatsChannel("games");

api.channels.statsChannel = statsChannel;
//clone the airborne api
var api = _.extend({}, airborne);
//api.activeGamesChannel.createChannel();
//api.activeGamesChannel.setGamesRegistry(api.data.activeGames);

module.exports = api;