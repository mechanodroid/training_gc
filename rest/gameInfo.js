var uuid = require('node-uuid/uuid');
var _ = require('underscore');
var activeGames = training.api.data.activeGames;

var masterGamesTest = [];

var feather = require('../lib/feather').getFeather();

module.exports = {

  "get": {

    "/masterGames": function(req, res, cb) {

      feather.logger.warn({category:'REST',message:'Getting master games list from server'});
      activeGames.list(cb);
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

      feather.logger.warn({category: 'rest', message: req.body.username + ' is launching a new ' + req.body.name + ' with id: '+req.body.id});
      //debugger;
      // TODO: Get the launcher to send the real id, not index, then use it here
      activeGames.add(req.body.username, req.body.id, cb);
    },
    "/join": function(req, res, cb) {
      feather.logger.warn({category: 'rest', message: req.body.username + ' wants to join a game: ' + req.body.id});
      activeGames.join(req.body.username, req.body.id, cb);
    },
    "/leave": function(req, res, cb) {
      feather.logger.warn({category: 'rest', message: req.body.username + ' wants to leave a game: ' + req.body.id});
      activeGames.leave(req.body.username, req.body.id, cb);
    },
      "/remove": function(req, res, cb) {
      debugger;
      var game = activeGames.removeById(req.body.id);
      feather.logger.warn({category: 'rest', message: 'The game ' + req.body.id + ' has been removed from stats'});
      cb(null, game);
    }
  }
};