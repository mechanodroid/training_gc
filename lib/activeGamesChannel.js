var _ = require("underscore");
var feather = require("./feather").getFeather();

var gamesChannelOptions = {
  messages: ["add", "update", "remove", "notify"],
  allowDirectMessaging: true,
  id: "games"
};

var gamesRegistry;

var activeGamesChannel = {};

activeGamesChannel.createChannel = function() {
	feather.socket.addChannel(gamesChannelOptions);
};

activeGamesChannel.setGamesRegistry = function(registry) {
	gamesRegistry = registry;
	gamesRegistry.on('itemAdded', function(game) {
		gameChannel.sendMessage('add', game);
	});
};



module.exports =  activeGamesChannel;

