var uuid = require('node-uuid/uuid');
var _ = require('underscore');
var activeGames = require('../lib/data/activeGames');

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

var feather = require('../lib/feather').getFeather();

module.exports = {

  "get": {

    "/": function(req, res, cb) {
      feather.logger.warn({category: 'rest', message: 'someone is getting game info'});
      cb(null, masterGames);
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
    },
    "/leave": function(req, res, cb) {
      debugger;
      feather.logger.warn({category: 'rest', message: req.body.username + ' wants to leave a game: ' + req.body.id});
      var game = activeGames.leave(req.body.username, req.body.id);
      cb(null, game);
    },
    "/remove": function(req, res, cb) {
      debugger;
      var game = activeGames.removeById(req.body.id);
      feather.logger.warn({category: 'rest', message: 'The game ' + req.body.id + ' has been removed from stats'});
      cb(null, game);
    }
  }
};