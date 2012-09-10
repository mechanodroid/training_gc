feather.ns("training_gc");
(function() {
  training_gc.gameList = feather.Widget.create({
    name: "training_gc.gameList",
    path: "widgets/gameList/",
    prototype: {
      onInit: function() {
      },
      onReady: function() {
        var me = this;
        var gameChannel = feather.socket.subscribe({id: "games"});
        //debugger;
        var myUsername = feather.util.qs.user || "honeypotter";

        $.ajax({
          url: '/_rest/gameInfo/activeGames/',
          dataType: "json",
          success: function(data) {
             for (var i = 0; i < data.length; i++) {
              appendGameLine(data[i]);
             }
            }
        });
        
        function appendGameLine(g) {
          feather.Widget.load({
            path: 'widgets/gameLine/',
            clientOptions: {
              container: $("<div/>").appendTo(me.get("#gameLineItems")),
              game: g,
              parent: me,
              id: "gameLine" + g.id,
              on: {
                join: function(args) {
                  var selectedGame = {};
                  selectedGame.id = args;
                  selectedGame.username = myUsername;
                  $.ajax({
                      url: "/_rest/gameInfo/join",
                      type: "post",
                      data: selectedGame,
                      success: function(response, textStatus, jqXHR){
                        feather.alert(g.name, "Congratulations, " + myUsername +"! You have joined " + g.name);
                      },
                      error: function(jqXHR, textStatus, errorThrown){
                        feather.alert(g.name, jqXHR.responseText);
                      },
                      complete: function(){
                      }
                  });
                },
                leave: function(args) {
                  var selectedGame = {};
                  selectedGame.id = args;
                  selectedGame.username = myUsername;
                  $.ajax({
                    url: "/_rest/gameInfo/leave",
                    type: "post",
                    data: selectedGame,
                    success: function(response, textStatus, jqXHR) {
                      
                    },
                    error: function(jqXHR, textStatus, errorThrown) {
                      feather.alert(g.name, jqXHR.responseText);
                    },
                    complete: function() {

                    }
                  });
                },
                kill: function(args) {
                  debugger;
                  var selectedGame = {id: args};
                  $.ajax({
                    url: "/_rest/gameInfo/remove",
                    type: "post",
                    data: selectedGame,
                    success: function(response, textStatus, jqXHR) {
                      
                    },
                    error: function(jqXHR, textStatus, errorThrown) {
                      feather.alert(g.name, jqXHR.responseText);
                    },
                    complete: function() {

                    }
                  });
                }
              }
            }
          });
        }
        
        function findGameLine(g) {
          return me.children && me.children.findById("gameLine" + g.id);
        }
        
        function updateGameLine(g) {
          var gameLine = findGameLine(g);
          if(gameLine) {
              gameLine.updateData(g);
          } else {
            throw "This game does not exist";
          } 
        }

        function removeGameLine(g) {
          var gameLine = findGameLine(g);
          if (gameLine) {
            gameLine.dispose();
          } else {
            throw "This game does not exist";
          }
        }

        gameChannel.on("add", function(args) {
          appendGameLine(args.data);
        });
        
        gameChannel.on("update", function(args) {
          debugger;
          updateGameLine(args.data);
        });
        
        gameChannel.on("remove", function(args) {
          debugger;
          removeGameLine(args.data);
        });
        
        gameChannel.on("notify", function(args) {
          feather.alert('Message from Game Center', args.data);
        });
      }
    }
  });
})();


