

// var games = [ 
//     {name: "Ninja", currentGames: 81, numberOfPlayers: 1, currentlyWaiting: 0},
//     {name: "Hamburger", currentGames: 2, numberOfPlayers: 4, currentlyWaiting: 3},
//     {name: "Chess", currentGames: 43, numberOfPlayers: 2, currentlyWaiting: 1}
//     ];



exports.getWidget = function(feather, cb) {
  cb(null, {
    name: "training_gc.gameList",
    path: "widgets/gameList/"
    // prototype: {
    // 	onRender: function(render) {
    //         var me = this;

    //         me.gamesMaster = games;

    //         render();
    // 	}
    //    }
  });
};