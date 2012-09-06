feather.ns("training_gc");

(function() {
  training_gc.statTest = feather.Widget.create({
    name: "training_gc.statTest",
    path: "widgets/statTest/",
    prototype: {
      onInit: function() {
        
      },
      onReady: function() {
        var me = this;
        var gameChannel = feather.socket.subscribe({id: "games"});

        me.domEvents.bind(me.get('#add'), 'click', function() {
          var text = me.get('#statinput').val();
          var stat = JSON.parse(text);
          $.ajax({
            url: "/_rest/gameInfo/addNew",
            type: "post",
            data: stat,
            success: function(response, textStatus, jqXHR){
                //feather.logger.debug("");
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
          //gameChannel.send('add', stat);
        });
        
        me.domEvents.bind(me.get('#update'), 'click', function() {
          var text = me.get('#statinput').val();
          var stat = JSON.parse(text);
          gameChannel.send('update', stat);
        });
        
        me.domEvents.bind(me.get('#remove'), 'click', function() {
          var text = me.get('#statinput').val();
          var stat = JSON.parse(text);
          gameChannel.send('remove', stat);
        });
        
        me.domEvents.bind(me.get('#notify'), 'click', function() {
          var text = me.get('#statinput').val();
          gameChannel.send('notify', text);
        });
        
      }
    }
  });
})();
