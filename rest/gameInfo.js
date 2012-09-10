var uuid = require('node-uuid/uuid');
var _ = require('underscore');
var activeGames = training.api.data.activeGames;

var masterGamesTest = [];

var feather = require('../lib/feather').getFeather();

module.exports = {

  "get": {

<<<<<<< HEAD
    "/masterGames": function(req, res, cb) {

      feather.logger.warn({category:'REST',message:'Getting master games list from server'});
      training.api.game.find({
        view : "default"
      }, function (err, result){
        if(err) {
          feather.logger.warn({category:'REST',message:'Could not find any results in games'});
          cb(null, masterGamesTest);

        } else {
          masterGamesTest = [];
          result.documents.forEach(function(key, id, documents) {
            masterGamesTest.push({id:id,name:key.name});
            feather.logger.debug({category:'REST', message:'Found document w/ id ' + id + 'key ' + key.name});
          });
          cb(null, masterGamesTest);
        }   
      });

     // cb(null, req.session.user);
=======
    "/": function(req, res, cb) {
      feather.logger.warn({category: 'rest', message: 'someone is getting game info'});
      cb(null, masterGames);
>>>>>>> active_games
    },
    "/activeGames": function(req, res, cb) {
      var games = activeGames.findAll(function(game) {
        return true;
      });

      cb(null, games);
    }
  }, 
  "post": {
    "/addNew": function(req, res, cb) {
<<<<<<< HEAD
      feather.logger.warn({category: 'rest', message: req.body.username + ' is launching a new ' + req.body.name});
      //debugger;
      // TODO: Get the launcher to send the real id, not index, then use it here
      var tempId = "01226e017b0ca6c6494923265000734d";
      activeGames.add(req.body.username, tempId, cb);
    },
    "/join": function(req, res, cb) {
      feather.logger.warn({category: 'rest', message: req.body.username + ' wants to join a game: ' + req.body.id});
      activeGames.join(req.body.username, req.body.id, cb);
=======
      debugger;
      feather.logger.warn({category: 'rest', message: req.body.username + ' is launching a new ' + req.body.name});
      var game = activeGames.add(req.body.username, req.body.masterGameId);
      cb(null, game);
    },
    "/join": function(req, res, cb) {
      debugger;
      feather.logger.warn({category: 'rest', message: req.body.username + ' wants to join a game: ' + req.body.id});
      var game = activeGames.join(req.body.username, req.body.id);
      cb(null, game);
>>>>>>> active_games
    },
    "/leave": function(req, res, cb) {
      feather.logger.warn({category: 'rest', message: req.body.username + ' wants to leave a game: ' + req.body.id});
<<<<<<< HEAD
      activeGames.leave(req.body.username, req.body.id, cb);
    },
    "/remove": function(req, res, cb) {
      try {
        var game = _.clone(req.body);
        game.id = game.guid;
        activeGames.remove(game);
        feather.logger.warn({category: 'rest', message: 'The game ' + req.body.id + ' has been removed from stats'});
        cb(null, game);
      } catch (exception) {
        cb(exception, null);
      }
=======
      var game = activeGames.leave(req.body.username, req.body.id);
      cb(null, game);
    },
    "/remove": function(req, res, cb) {
      debugger;
      var game = activeGames.removeById(req.body.id);
      feather.logger.warn({category: 'rest', message: 'The game ' + req.body.id + ' has been removed from stats'});
      cb(null, game);
>>>>>>> active_games
    }
  }
};