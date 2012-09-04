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
        var myUsername = feather.util.qs.user || "honeypotter";

        me.domEvents.bind(me.get('#sendstats'), 'click', function() {
          //debugger;
          var text = me.get('#statinput').val();
          var stat = JSON.parse(text);
          stat.username = myUsername;
          $.ajax({
              url: "/_rest/gameInfo/addNew",
              type: "post",
              data: stat,
              // callback handler that will be called on success
              success: function(response, textStatus, jqXHR){
                  // log a message to the console
                  feather.logger.debug("Hooray, it worked!");
              },
              // callback handler that will be called on error
              error: function(jqXHR, textStatus, errorThrown){
                  // log the error to the console
                  feather.logger.error(
                      "The following error occured: "+
                      textStatus, errorThrown
                  );
              },
              // callback handler that will be called on completion
              // which means, either on success or error
              complete: function(){
                  // enable the inputs
                  //$inputs.removeAttr("disabled");
              }
          });
        });
      }
    }
  });
})();