
feather.ns("training_gc");
(function() {
  training_gc.launcher = feather.Widget.create({
    name: "training_gc.launcher",
    path: "widgets/launcher/",
    prototype: {
      onInit: function() {
        
      },
      onReady: function() {
        var me = this;
        var gameStatsRoom = me.options.gamesRoom || "lobby";
        var gameStatsChannel = feather.socket.subscribe({id: gameStatsRoom});
        var myUsername = feather.util.qs.user || "joeschmoe";
        var masterGamesFromServer;
        
        function findGameIndexByID(games, id ) {
          for(var i = 0; i<games.length; i++) {
             if(games[i].id==id){
                return i;
              } 
          }
          return 0;
        }
      
        me.server_populateList(function(args) {
             var gameSelect = me.get("#gamesSelect");
             for (var i = 0, len = args.result.length; i < len; ++i) {
                 var item = args.result[i];
                 gameSelect.append("<option value=\""+item.id+"\">"+item.name+"</option>");
             }
            masterGamesFromServer = args.result;
            }
        );

        function selectValue(){
          return me.get("#gamesSelect").val();
        }

        function launchGame(gamesFromRest){
          var index = findGameIndexByID(gamesFromRest, me.get("#gamesSelect").val());
          var gameName = gamesFromRest[index].name;
          gameStatsChannel.send("message", {message: "launched game:" + gameName, username: myUsername});
          appendToLog("Me: " + gameName, " launched");
          feather.alert("game launcher",'Game Has Launched: '+gameName);           
          var body = {
            name : gameName,
            username : myUsername,
            id : selectValue()
          }
          alert("ID is "+body.id);
          me.get("#gamesSelect").val("");



          var request = $.ajax({
            url: '/_rest/gameInfo/addNew/',
            dataType: "html",
            type: "POST",
            data: body,
          });
          request.done(function(msg) {
            //debugger;
            $("#gameLog").html( msg );
          });
          request.fail(function(jqXHR, textStatus) {
            alert( "Request failed: " + textStatus );
          });




        }


        function appendToLog(message, spanClass){
          var gameLog = me.get("#gameLog");
          gameLog.append("<span class=\"" + spanClass + "\">" + message + "</span><br/>");
          gameLog.scrollTop(gameLog.height());
        }


        //when one of my buttons is clicked, send a chat message on the chat channel
        me.domEvents.bind(me.get("#launchButton"), "click", function() {
          launchGame(masterGamesFromServer);
        });
      }
    }
  });
})();