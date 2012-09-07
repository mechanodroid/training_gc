
var api = {
  channels: require("./channels"),
  data: require("./data/data")
};

debugger;
// Stuff we need to do
api.channels.addChatChannel("lobby");
var gamesChannel = api.channels.addGamesChannel();

api.data.activeGames.on('itemAdded', function(game) {
	debugger;
	gamesChannel.sendMessage('add', game);
});

api.data.activeGames.on('itemChanged', function(game) {
	gamesChannel.sendMessage('update', game);
});

api.data.activeGames.on('itemRemoved', function(game) {
	gamesChannel.sendMessage('remove', game);
});

module.exports = api;