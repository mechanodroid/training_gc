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
              id: "gameLine" + g.guid,
              on: {
                join: function(args) {
                  var stat = {};
                  stat.guid = g.guid;
                  stat.username = myUsername;
                  $.ajax({
                      url: "/_rest/gameInfo/join",
                      type: "post",
                      data: stat,
                      success: function(response, textStatus, jqXHR){
                          feather.logger.debug("Hooray, it worked!");
                      },
                      error: function(jqXHR, textStatus, errorThrown){
                          feather.logger.error(
                              "The following error occured: "+
                              textStatus, errorThrown
                          );
                      },
                      complete: function(){
                      }
                  });
                }
              }
            }
          });
        }
        
        function findGameLine(g) {
          return me.children && me.children.findById("gameLine" + g.guid);
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
            updateGameLine(args.data);
        });
        
        gameChannel.on("remove", function(args) {
            removeGameLine(args.data);
        });
        
        gameChannel.on("notify", function(args) {
          feather.alert('Message from Game Center', args.data);
        });
      }
    }
  });
})();


