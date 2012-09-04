var masterGames = [ 
   {guid: 0, name: "Ninja", minNumberOfPlayers: 1, maxNumberOfPlayers: 1},
   {guid: 1, name: "Hamburger", minNumberOfPlayers: 1, maxNumberOfPlayers: 4}, 
   {guid: 2, name: "Chess", minNumberOfPlayers: 2, maxNumberOfPlayers: 2},
   {guid: 3, name: "Monster Bowling", minNumberOfPlayers: 2, maxNumberOfPlayers: 6},
   {guid: 4, name: "End Runner", minNumberOfPlayers: 3, maxNumberOfPlayers: 10},
   {guid: 5, name: "Monitor Throwing", minNumberOfPlayers: 2, maxNumberOfPlayers: 10},
   {guid: 6, name: "Grocery Bagger", minNumberOfPlayers: 2, maxNumberOfPlayers: 4},
   {guid: 7, name: "Bug Squash", minNumberOfPlayers: 1, maxNumberOfPlayers: 0},
   {guid: 8, name: "Sally Says", minNumberOfPlayers: 3, maxNumberOfPlayers: 0},
   {guid: 9, name: "Alien Masher", minNumberOfPlayers: 2, maxNumberOfPlayers: 4},
   {guid: 10, name: "Magic", minNumberOfPlayers: 6, maxNumberOfPlayers: 6},
   {guid: 11, name: "Fruit Ninja", minNumberOfPlayers:  1, maxNumberOfPlayers: 4},
   {guid: 12, name: "Dance Party", minNumberOfPlayers: 2, maxNumberOfPlayers: 10},
   {guid: 13, name: "Sing Snap", minNumberOfPlayers: 1, maxNumberOfPlayers: 0},
   {guid: 14, name: "Crates and Barrels", minNumberOfPlayers: 1, maxNumberOfPlayers: 1}
];



var feather = require('../lib/feather').getFeather();

module.exports = {

  "get": {

    "/:list/": function(req, res, cb) {

      feather.logger.warn({category: 'rest', message: 'someone is getting game info'});

     // cb(null, req.session.user);
     cb(null, masterGames);
    }






  }
};