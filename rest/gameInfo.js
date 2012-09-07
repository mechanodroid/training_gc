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

var masterGamesTest = [];


var activeGames = [];

var feather = require('../lib/feather').getFeather();

function loadMasterList(){
    feather.logger.warn({category:'REST',message:'Getting master games list from server'});
    training.api.game.find({
      view : "default"
    }, function (err, result){
        if(err) {
          feather.logger.warn({category:'REST',message:'Could not find any results in games'});
        } else {
          var newGame = {
            id : 0,
            name : ""
          }; 
          result.documents.forEach(function(key, id, documents) {
            newGame.id = id;
            newGame.name = key.name;
            masterGamesTest.push(newGame);
            feather.logger.debug({category:'REST', message:'Found document w/ id ' + id + 'key ' + key});
          });

        }   
    });
}


module.exports = {

  "get": {

    "/:list": function(req, res, cb) {

      loadMasterList();
      feather.logger.warn({category: 'rest', message: 'someone is getting game info'});

     // cb(null, req.session.user);
     cb(null, masterGamesTest);
    },
    "/activeGames": function(req, res, cb) {
      cb(null, activeGames);
    }
  }, 
  "post": {
    "/addNew": function(req, res, cb) {
      debugger;

      feather.logger.warn({category: 'rest', message: req.body.username + ' is launching a new ' + req.body.name});
      var game = activeGames.add(req.body,0);
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
    "/leave": function(req, res, cb) {
      
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
          cb(null, game);
    }
  }
};