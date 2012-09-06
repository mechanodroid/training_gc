var feather = require("../feather").getFeather(),
  inherits = require("inherits"),
  _ = require('underscore');

var masterGames = [ 
   {id: 0, name: "Ninja", minNumberOfPlayers: 1, maxNumberOfPlayers: 1},
   {id: 1, name: "Hamburger", minNumberOfPlayers: 1, maxNumberOfPlayers: 4}, 
   {id: 2, name: "Chess", minNumberOfPlayers: 2, maxNumberOfPlayers: 2},
   {id: 3, name: "Monster Bowling", minNumberOfPlayers: 2, maxNumberOfPlayers: 6},
   {id: 4, name: "End Runner", minNumberOfPlayers: 3, maxNumberOfPlayers: 10},
   {id: 5, name: "Monitor Throwing", minNumberOfPlayers: 2, maxNumberOfPlayers: 10},
   {id: 6, name: "Grocery Bagger", minNumberOfPlayers: 2, maxNumberOfPlayers: 4},
   {id: 7, name: "Bug Squash", minNumberOfPlayers: 1, maxNumberOfPlayers: 0},
   {id: 8, name: "Sally Says", minNumberOfPlayers: 3, maxNumberOfPlayers: 0},
   {id: 9, name: "Alien Masher", minNumberOfPlayers: 2, maxNumberOfPlayers: 4},
   {id: 10, name: "Magic", minNumberOfPlayers: 6, maxNumberOfPlayers: 6},
   {id: 11, name: "Fruit Ninja", minNumberOfPlayers:  1, maxNumberOfPlayers: 4},
   {id: 12, name: "Dance Party", minNumberOfPlayers: 2, maxNumberOfPlayers: 10},
   {id: 13, name: "Sing Snap", minNumberOfPlayers: 1, maxNumberOfPlayers: 0},
   {id: 14, name: "Crates and Barrels", minNumberOfPlayers: 1, maxNumberOfPlayers: 1}
];

var errorMessages = {
  duplicate_join_error: "You have already joined this game.",
  game_closed_error: "That game is no longer open for new players.",
  game_not_found_error: "That game is no longer available."
}

function isGameOpen(game){
  var userCount = 0;
  if (game.users) userCount = game.users.length;
  return (userCount >= game.maxNumberOfPlayers);
}

function isGameInProgress(game){
  var userCount = 0;
  if (game.users) userCount = game.users.length;
  return (userCount >= game.minNumberOfPlayers);
}

function getGameById(gameId){
  return _.find(this.activeGames, function(game){
    return (game.id == masterGameId);
  });
}

var activeGames = new Registry();

activeGames.prototype = {
  add: function(username, masterGameId) {
    
    var masterGame = getGameById(masterGameId);
    var clonedGame = _.clone(masterGame);

    clonedGame.id = uuid.v1();
    clonedGame.users = [username];
    clonedGame.acceptingNewPlayers = isGameOpen(clonedGame);
    clonedGame.inProgress = isGameInProgress(clonedGame);

    activeGames.add(clonedGame);
  },
  join: function(username, gameId) {

    // Validate - User not in list, game is in list, game is open
    // Add user to list, update game properties

    var game = getGameById(gameId);

    if (game == 'undefined') {
      throw new Error(errorMessages.game_not_found_error);
    }

    var i = game.users.indexOf(username);
    if (i >= 0) {
      throw new Error(errorMessages.duplicate_join_error);
    }
    if (!game.acceptingNewPlayers) {
      throw new Error(errorMessages.game_closed_error);
    }

    game.users.push(username);
    game.acceptingNewPlayers = isGameOpen(game);

    this.fire("itemChanged", item);
  },
  leave: function(username, gameId) {
    // Validate - User is in list, game is in list
    // Remove user from list, update game properties
    var game = getGameById(gameId);

    if (game == 'undefined') {
      throw new Error(errorMessages.game_not_found_error);
    }

    // Find user, remove them.
    // If user not found, just ignore them
    var i = game.users.indexOf(username);
    if (i >= 0) {
      game.users.splice(i, 1);


 
      if (game.users.length == 0) {
        activeGames.remove(game);      
      } else {
        this.fire("itemChanged", item);
      }
    }
  }
};

inherits(activeGames, Registry)

module.exports = activeGames;
