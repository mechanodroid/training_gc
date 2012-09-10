feather.ns("training_gc");
(function() {

  training_gc.chat = feather.Widget.create({
    name: "training_gc.chat",
    path: "widgets/lobby/",
    prototype: {
      onInit: function() {
        
      },
      onReady: function() {
        var me = this;
        var gameStatsRoom = me.options.gameStatsRoom || "games";
        var gameChannel = feather.socket.subscribe({id: gameStatsRoom});
        var myUsername = feather.util.qs.user || "joeschmoe";

        function sendText(){
          var text = me.get("#gameText").val();
          gameChannel.send("message", {message: text, username: myUsername});
          appendToLog("Me: " + text, "sent");
          me.get("#chatText").val("");
        }

        function appendToLog(message, spanClass){
          var gameLog = me.get("#chatText");
          gameLog.append("<span class=\"" + spanClass + "\">" + message + "</span><br/>");
          gameLog.scrollTop(gameLog.height());
        }

        me.domEvents.bind(me.get("#sendButton"), "click", function() {
          sendText();
        });

        me.domEvents.bind(me.get("#gameText"), "keypress", function(event) {
          if (event.keyCode == 13) {
            sendText();
          }
        });

        gameChannel.on("message", function(args) {
          var user = args.data.username || "???";
          var msg = user + ": " + args.data.message;
          appendToLog(msg, "received");
        });
        
      }
    }
  });
})();