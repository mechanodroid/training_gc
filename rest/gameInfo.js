var uuid = require('node-uuid/uuid');
var _ = require('underscore');

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

var activeGames = [];
var feather = require('../lib/feather').getFeather();

module.exports = {

  "get": {

    "/": function(req, res, cb) {

      feather.logger.warn({category: 'rest', message: 'someone is getting game info'});

     // cb(null, req.session.user);
     cb(null, masterGames);
    },
    "/activeGames": function(req, res, cb) {
      cb(null, activeGames);
    }
  }, 
  "post": {
    "/addNew": function(req, res, cb) {
      debugger;

      feather.logger.warn({category: 'rest', message: req.body.username + ' is launching a new ' + req.body.name});
      var id = uuid.v1();
      req.body.guid = id;
      req.body.users = [req.body.username];
      req.body.currentlyWaiting = 1;      
      activeGames.push(req.body);
      var game = _.extend(_.clone(req.body), {action: "new"});
      training.api.channels.statsChannel.sendMessage('stats', game);
      cb(null, game);
    },
    "/join": function(req, res, cb) {
      debugger;
      
      for(var i = 0; i < activeGames.length; i++) {
        if (req.body.guid == activeGames[i].guid) {
          var game = activeGames[i];
          // check if user is already in game 
          for (var j = 0; j < game.users.length; j++)
          {
            if (game.users[j] == req.body.username)
              var userIsWaiting = true;
          }
          game.currentlyWaiting = parseInt(game.currentlyWaiting) + 1;
          game.action = "update";
          if (!userIsWaiting) {
            training.api.channels.statsChannel.sendMessage('stats', game);
            feather.logger.warn({category: 'rest', message: req.body.username + ' joined a game in progress ' + game.guid});
          } else {
            training.api.channels.statsChannel.sendMessage('notify', "You have already joined this game.");
          }

          break;
        }
      };
      if (game == undefined) {
        training.api.channels.statsChannel.sendMessage('notify', "That game is no longer open for new players.");
      }

      cb(null, game);
    },
    "/remove": function(req, res, cb) {
      debugger;
      feather.logger.warn({category: 'rest', message: 'The game ' + req.body.game.guid + ' has been removed from stats'});
      for (var i = 0; i < activeGames.length; i++) {
        if (req.body.guid == activeGames[i].guid) {
          var game = activeGames[i];
          game.action = "pau";
          training.api.channels.statsChannel.sendMessage('stats', game);
          break;
        }
      }
    }
    cb(null, )
  }
};