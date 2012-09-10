feather.ns("training_gc");
(function() {

  training_gc.chat = feather.Widget.create({
    name: "training_gc.chat",
    path: "widgets/chat/",
    prototype: {
      onInit: function() {
        
      },
      onReady: function() {
        var me = this;
        var chatRoom = me.options.chatRoom || "lobby";
        var chatChannel = feather.socket.subscribe({id: chatRoom});
        var myUsername = feather.util.qs.user || "joeschmoe";

        function sendText(){
          var text = me.get("#chatText").val();
          chatChannel.send("message", {message: text, username: myUsername});
          appendToLog("Me: " + text, "sent");
          me.get("#chatText").val("");
        }

        function appendToLog(message, spanClass){
          var chatLog = me.get("#chatLog");
          chatLog.append("<span class=\"" + spanClass + "\">" + message + "</span><br/>");
          chatLog.scrollTop(chatLog.height());
        }

        //when one of my buttons is clicked, send a chat message on the chat channel
        me.domEvents.bind(me.get("#sendButton"), "click", function() {
          sendText();
        });

        me.domEvents.bind(me.get("#chatText"), "keypress", function(event) {
          if (event.keyCode == 13) {
            sendText();
          }
        });

        chatChannel.on("message", function(args) {
          var user = args.data.username || "???";
          var msg = user + ": " + args.data.message;
          appendToLog(msg, "received");
        });
        
        chatChannel.on("connection", function(args) {
          var user = args.data.username || "???";
          appendToLog("User Joined Chat: " + user, "alert");
        });
        
        chatChannel.on("disconnection", function(args) {
          var user = args.data.username || "???";
          appendToLog("User Left Chat: " + user, "alert");
        });
      }
    }
  });
})();