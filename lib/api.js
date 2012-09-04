
var api = {
  channels: require("./channels")
};

// Stuff we need to do
api.channels.addChatChannel("lobby");
var statsChannel = api.channels.addStatsChannel("games");

api.channels.statsChannel = statsChannel;

module.exports = api;