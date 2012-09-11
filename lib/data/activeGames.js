var feather = require("../feather").getFeather(),
  inherits = require("inherits"),
  uuid = require("node-uuid"),
  _ = require('underscore');


var errorMessages = {
  invalid_game_id: "Unable to find the requested game.",
  duplicate_join_error: "You have already joined this game.",
  game_closed_error: "That game is no longer open for new players.",
  game_not_found_error: "That game is not found."
}

function isGameOpen(game){
  var userCount = 0;
  if (game.users) userCount = game.users.length;
  return (userCount < game.maxPlayers);
}

function isGameInProgress(game){
  var userCount = 0;
  if (game.users) userCount = game.users.length;
  return (userCount >= game.minPlayers);
}

var ActiveGames = function(options) {
  ActiveGames.super.call(this, options);
};

ActiveGames.prototype = {
  add: function(username, masterGameId, cb) {
    //debugger;
    var me = this;

    training.api.game.get({id: masterGameId}, function(err, masterGame){
      if (err) {
        cb(err, null);
      } else if (!masterGame) {
        cb(new Error(errorMessages.invalid_game_id), null);
      } else {

        var clonedGame = _.clone(masterGame);
        clonedGame.id = uuid.v1();
        clonedGame.users = [username];
        clonedGame.acceptingNewPlayers = isGameOpen(clonedGame);
        clonedGame.inProgress = isGameInProgress(clonedGame);

        ActiveGames.super.prototype.add.call(me, clonedGame);

        cb(null, clonedGame);        
      }
    });
  },
  join: function(username, gameId, cb) {

    var me = this;

    // Validate - User not in list, game is in list, game is open
    // Add user to list, update game properties
    try {
      var game = this.findById(gameId);

      if (!game) throw new Error(errorMessages.game_not_found_error);

      var i = game.users.indexOf(username);
      if (i >= 0) throw new Error(errorMessages.duplicate_join_error);

      if (!game.acceptingNewPlayers) {
        throw new Error(errorMessages.game_closed_error);
      }

      game.users.push(username);
      game.acceptingNewPlayers = isGameOpen(game);
      game.inProgress = isGameInProgress(game);

      this.fire("itemChanged", game);

      cb(null, game);
    } catch (err) {
      cb(err.message, null);
    }
  },
  list: function(cb){
      training.api.game.find({
        view : "default"
      }, function (err, result){
        if(err) {
          feather.logger.warn({category:'REST',message:'Could not find any results in games'});
          cb(err);

        } else {
          masterGames = [];
          result.documents.forEach(function(doc, index, documents) {
            masterGames.push({id:doc._id,name:doc.name});
            feather.logger.debug({category:'REST', message:'Found document w/ id ' + doc._id + 'key ' + doc.name});
          });
          cb(null, masterGames);
        }   
      });
  },
  leave: function(username, gameId, cb) {

    var me = this;
    // Validate - User is in list, game is in list
    // Remove user from list, update game properties
    try {
      var game = this.findById(gameId);

      if (!game) {
        throw new Error(errorMessages.game_not_found_error);
      }

      // Find user, remove them.
      // If user not found, just ignore them
      var i = game.users.indexOf(username);
      if (i >= 0) {
        game.users.splice(i, 1);
        game.acceptingNewPlayers = isGameOpen(game);
        game.inProgress = isGameInProgress(game);
   
        if (game.users.length == 0) {
          activeGames.remove(game);      
        } else {
          this.fire("itemChanged", game);
        }
      }

      cb(null, game);
    } catch (err) {
      cb(err.message, null);
    }
  }
};

inherits(ActiveGames, Registry);

var activeGames = new ActiveGames();

module.exports = activeGames;
